import { AbstractMigration, ClientPostgreSQL } from "../../../deps.ts";
import { runQuery } from "../database.ts";

export default class extends AbstractMigration<ClientPostgreSQL> {
  /** Runs on migrate */
  async up(): Promise<void> {
    await runQuery(`
    create table users
      (
          id          bigint,
          username    text                                not null,
          email       text                                not null,
          password    text,
          "avatarUrl" text                                not null,
          permissions bigint                              not null,
          groups      text[] default ARRAY ['USER'::text] not null
      );

      create unique index users_email_uindex
      
      on users (email);

      create unique index users_username_uindex
          on users (username);

      create unique index users_id_uindex
          on users (id);
    `);
  }

  /** Runs on rollback */
  async down(): Promise<void> {
    await runQuery(`drop table users;`);
  }
}
