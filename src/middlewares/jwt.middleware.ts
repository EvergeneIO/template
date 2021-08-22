import { jwt } from "../../deps.ts";
import { Context, User } from "../types/mod.ts";
import configs from "../../configs.ts";
import db from "../database/database.ts";
import { getUser, setTokens } from "../helpers/mod.ts";
const publicKey = await Deno.readTextFile("./certs/public.pem");

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

// deno-lint-ignore ban-types
export async function getJwtPayload<T extends {}>(token: string): Promise<T | undefined> {
  return (await jwt.verify(token, publicKey, "RS512").catch(() => undefined)) as T;
}

interface RefreshToken {
  id: string;
  sessionId: string;
}

export async function jwtMiddleware(context: Context, next: () => Promise<unknown>) {
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
    const payload = await getJwtPayload<JsonUser>(token);

    // If a payload has been returned this means the accessToken is still valid so just continue
    if (payload) {
      if (!payload?.sessionId || !(await validSession(payload.sessionId, BigInt(payload.id))))
        context.throw(401, "Invalid access token provided.");

      context.state.user = { ...payload, id: BigInt(payload.id), permissions: BigInt(payload.permissions) };
      return await next();
    }
  }

  // Access token is no longer valid so check refresh token
  const refreshToken = await context.cookies.get("refresh_token");
  if (refreshToken) {
    // TODO: maybe add refresh token type idk
    const payload = await getJwtPayload<RefreshToken>(refreshToken); // { id: number, invalidyRound: number } iwie so user id
    // The provided refresh token is invalid so error out
    if (!payload) {
      const [, decoded] = jwt.decode(refreshToken) as [string, RefreshToken, string];
      if (decoded) {
        db.deleteFrom(db.sessions).where(db.sessions.sessionId.eq(decoded.sessionId));
        context.cookies.delete("token");
        context.cookies.delete("refresh_token");
      }
      return context.response.redirect(configs.logoutRedirectUri);
    }

    if (!(await validSession(payload.sessionId, BigInt(payload.id))))
      context.throw(401, "Invalid refresh token provided.");

    // Get the data of the user using the data stored in the refresh token
    const user: User = { ...(await getUser(BigInt(payload.id))), sessionId: payload.sessionId };
    // Either the users id or the tokenValityRound is invalid so error out ?
    if (!user) context.throw(401, "Invalid refresh token provided.");

    // create a new valid access token and store it in the users cookies

    await setTokens(user, context);

    // finish up with storing the users data in context.state
    context.state.user = {
      id: user.id,
      username: user.username,
      sessionId: payload.sessionId,
      permissions: user.permissions,
    };
  }

  return await next();
}

type JsonUser = ToStringObject<User>;
// Convert bigint props of interface to string type
// deno-lint-ignore ban-types
type ToStringObject<T extends {}> = { [K in keyof T]: T[K] extends bigint ? string : T[K] };
