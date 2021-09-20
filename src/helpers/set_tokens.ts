import { Context, User } from "../types/mod.ts";
import configs from "../../configs.ts";
import db from "../database/database.ts";
import { createFernetToken } from "../utils/mod.ts";

export async function setTokens(user: Omit<User, "expires"> & { expires?: number }, context: Context) {
  const token = createFernetToken({
    id: user.id.toString(),
    username: user.username,
    permissions: user.permissions.toString(),
    sessionId: user.sessionId,
    expires: Date.now() + configs.accessTokenLiveTime,
  });

  await context.cookies.set("token", `Bearer ${token}`);

  await db
    .insertInto(db.sessions)
    .values({ userId: user.id, sessionId: user.sessionId, exp: BigInt(Date.now() + 604800000) })
    .onConflict("sessionId", "userId")
    .doUpdateSet({ exp: BigInt(Date.now() + 604800000) });
}
