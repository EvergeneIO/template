import { Context, User } from "../types/mod.ts";
import configs from "../../configs.ts";
import db from "../database/database.ts";
import { createJwtToken } from "../utils/mod.ts";

export async function setTokens(user: User, context: Context) {
  const token = await createJwtToken(
    {
      id: user.id.toString(),
      username: user.username,
      permissions: user.permissions.toString(),
      sessionId: user.sessionId,
    },
    configs.accessTokenLiveTime
  );

  const refreshToken = await createJwtToken(
    {
      id: user.id.toString(),
      sessionId: user.sessionId,
    },
    configs.refreshTokenLiveTime
  );

  await context.cookies.set("token", `Bearer ${token}`);
  await context.cookies.set("refresh_token", refreshToken);

  await db
    .insertInto(db.sessions)
    .values({ userId: user.id, sessionId: user.sessionId, exp: BigInt(Date.now() + 604800000) })
    .onConflict("sessionId", "userId")
    .doUpdateSet({ exp: BigInt(Date.now() + 604800000) });
}
