import { AbstractSeed, Info, ClientPostgreSQL } from "https://deno.land/x/nessie@2.0.0-rc4/mod.ts";
import { logger } from "../../utils/mod.ts";
import db from "../database.ts";

export default class extends AbstractSeed<ClientPostgreSQL> {
  /** Runs on seed */
  async run(info: Info): Promise<void> {
    await db.insertInto(db.groups).values({ name: "USER", permissions: 4n });
  }
}
