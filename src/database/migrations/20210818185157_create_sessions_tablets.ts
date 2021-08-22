import { AbstractMigration, ClientPostgreSQL } from "../../../deps.ts";
import { runQuery } from "../database.ts";

export default class extends AbstractMigration<ClientPostgreSQL> {
  /** Runs on migrate */
  async up(): Promise<void> {
    await runQuery(`CREATE TABLE "sessions" (
            "userId" BIGINT,
            "sessionId" TEXT,
            "exp" BIGINT not null,
            PRIMARY KEY ("userId", "sessionId")
        );`);
  }

  /** Runs on rollback */
  async down(): Promise<void> {
    await runQuery(`DROP TABLE "sessions";`);
  }
}
