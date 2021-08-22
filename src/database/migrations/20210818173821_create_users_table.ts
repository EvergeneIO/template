import { AbstractMigration, ClientPostgreSQL } from "../../../deps.ts";
import { runQuery } from "../database.ts";

export default class extends AbstractMigration<ClientPostgreSQL> {
  /** Runs on migrate */
  async up(): Promise<void> {
    await runQuery(`create table users (
            id BIGINT constraint users_pk primary key,
            username TEXT not null,
            permissions bigint default 1 not null);`);
  }

  /** Runs on rollback */
  async down(): Promise<void> {
    await runQuery(`drop table users;`);
  }
}
