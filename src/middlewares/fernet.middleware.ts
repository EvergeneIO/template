import { setTokens } from "../helpers/mod.ts";
import db from "../database/database.ts";
import { Context, User } from "../types/context.ts";
import { fernet } from "../constants/token.ts";

const textDecoder = new TextDecoder();

/** Cache for sessions, mapped by sessionId, valid */
export const cachedSessions = new Map<string, boolean>();

async function validSession(sessionId: string, userId: bigint): Promise<boolean> {
  if (cachedSessions.has(sessionId)) return cachedSessions.get(sessionId)!;

  const valid = await db
    .select(db.count(db.sessions.sessionId))
    .from(db.sessions)
    .where(db.sessions.sessionId.eq(sessionId).and(db.sessions.userId.eq(userId)))
    .then((res) => Boolean(res[0]?.count));

  cachedSessions.set(sessionId, valid);
  return valid;
}

export async function fernetMiddleware(context: Context, next: () => Promise<unknown>) {
  //const authorization = context.request.headers.get('Authorization');
  //if (type === "application") {
  //  //TODO: call application check function
  //}

  const accessToken = await context.cookies.get("token");
  // If an accessToken has been found decode it
  if (accessToken) {
    // TODO: check access token type - da wirds wichtig was fürn token du gibst entweder user oder application
    // If token type is application throw error if token is invalid
    const [type, token] = accessToken.split(" ");
    if (type !== "Bearer") context.throw(401, "Invalid access token provided.");

    // Somehow the stored token is invalid so error
    if (!token) context.throw(401, "Invalid access token provided.");
    // Get the payload of the accessToken
    const payload: User = JSON.parse(textDecoder.decode(fernet.decode(token)));

    // If a payload has been returned this means the accessToken is still valid so just continue
    if (payload) {
      if (!payload?.sessionId || !(await validSession(payload.sessionId, BigInt(payload.id))))
        context.throw(401, "Invalid access token provided.");

      if (payload.expires <= Date.now()) {
        await db.deleteFrom(db.sessions).where(db.sessions.sessionId.eq(payload.sessionId));
        cachedSessions.delete(payload.sessionId);
        context.cookies.delete("token");
        context.throw(401, "Invalid access token provided.");
      }

      if (Date.now() >= payload.expires - 86400000) {
        setTokens(payload, context);
      }
      context.state.user = { ...payload, id: BigInt(payload.id), permissions: BigInt(payload.permissions) };
      return await next();
    }
  }

  return await next();
}

type JsonUser = ToStringObject<User>;
// Convert bigint props of interface to string type
// deno-lint-ignore ban-types
type ToStringObject<T extends {}> = { [K in keyof T]: T[K] extends bigint ? string : T[K] };
