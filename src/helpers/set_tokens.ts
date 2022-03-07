import { Context, User } from "../types/mod.ts";
import configs from "../../configs.ts";
import db from "../database/database.ts";
import { createFernetToken } from "../utils/mod.ts";
import { Client } from "../constants/token.ts";
import { cachedSessions } from "../middlewares/middlewares.ts";

export async function setTokens(user: Omit<User, "expires"> & { expires?: number }, context: Context) {
  const token = createFernetToken(
    {
      id: user.id.toString(),
      username: user.username,
      email: user.email,
      permissions: user.permissions.toString(),
      avatarUrl: user.avatarUrl,
      groups: user.groups,
      sessionId: user.sessionId,
      expires: Date.now() + configs.fernet.client.live,
    },
    Client
  );

  await context.cookies.set("token", `Client ${token}`);

  await db
    .insertInto(db.sessions)
    .values({ userId: user.id, sessionId: user.sessionId, exp: BigInt(Date.now() + 604800000) })
    .onConflict("sessionId", "userId")
    .doUpdateSet({ exp: BigInt(Date.now() + 604800000) });
}
