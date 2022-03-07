import { AbstractMigration, ClientPostgreSQL } from "../../../deps.ts";
import { runQuery } from "../database.ts";

export default class extends AbstractMigration<ClientPostgreSQL> {
  /** Runs on migrate */
  async up(): Promise<void> {
    await runQuery(`
    create table channels
      (
          "userId"         bigint not null,
          "channelId"      text   not null
              constraint channels_pk
                  primary key,
          name             text   not null,
          "profilePicture" text   not null,
          banner           text   not null,
          uploads          text   not null,
          "accessToken"    text   not null,
          "refreshToken"   text   not null
      );
    `);
  }

  /** Runs on rollback */
  async down(): Promise<void> {
    await runQuery(`drop table channels`);
  }
}
