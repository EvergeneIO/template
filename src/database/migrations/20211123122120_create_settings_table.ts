import { AbstractMigration, ClientPostgreSQL } from "../../../deps.ts";
import { runQuery } from "../database.ts";

export default class extends AbstractMigration<ClientPostgreSQL> {
  /** Runs on migrate */
  async up(): Promise<void> {
    await runQuery(`
    create table settings
      (
          id          bigint not null,
          notify      boolean default true,
          emailverify boolean default false
      );

    create unique index settings_id_uindex
    on settings (id);
    `);
  }

  /** Runs on rollback */
  async down(): Promise<void> {
    await runQuery(`drop settings table`);
  }
}
