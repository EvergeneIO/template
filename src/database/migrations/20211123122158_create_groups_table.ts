import { AbstractMigration, ClientPostgreSQL } from "../../../deps.ts";
import { runQuery } from "../database.ts";

export default class extends AbstractMigration<ClientPostgreSQL> {
  /** Runs on migrate */
  async up(): Promise<void> {
    await runQuery(`
    create table groups
      (
          name        text   not null
              constraint table_name_pk
                  primary key,
          permissions bigint not null
      );
    `);
  }

  /** Runs on rollback */
  async down(): Promise<void> {
    await runQuery(`drop table groups`);
  }
}
