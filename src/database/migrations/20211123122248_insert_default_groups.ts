import { AbstractMigration, ClientPostgreSQL } from "../../../deps.ts";
import db from "../database.ts";

export default class extends AbstractMigration<ClientPostgreSQL> {
  /** Runs on migrate */
  async up(): Promise<void> {
    await db.insertInto(db.groups).values({ name: "USER", permissions: 4n });
  }

  /** Runs on rollback */
  async down(): Promise<void> {
    //nothing
  }
}
