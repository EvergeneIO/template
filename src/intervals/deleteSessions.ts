import db from "../database/database.ts";
import { createInterval } from "../utils/mod.ts";
import { cachedSessions } from "../middlewares/fernet.middleware.ts";

export const deleteSessions = createInterval("Delete old Sessions", 1000 * 60 * 60 * 24 * 7, async () => {
  const deletedSessions = await db
    .deleteFrom(db.sessions)
    .where(db.sessions.exp.lte(BigInt(Date.now())))
    .returning("sessionId");
  for (const deleted of deletedSessions) {
    cachedSessions.delete(deleted.sessionId);
  }
});
