import { AbstractMigration, ClientPostgreSQL } from "../../../deps.ts";
import { runQuery } from "../database.ts";

export default class extends AbstractMigration<ClientPostgreSQL> {
  /** Runs on migrate */
  async up(): Promise<void> {
    await runQuery(`
    create table sessions
      (
          "userId"    bigint not null,
          "sessionId" text   not null,
          exp         bigint not null,
          constraint sessions_pkey
              primary key ("userId", "sessionId")
      );
    `);
  }

  /** Runs on rollback */
  async down(): Promise<void> {
    await runQuery(`drop table sessions`);
  }
}
