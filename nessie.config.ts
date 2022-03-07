import { ClientPostgreSQL, NessieConfig } from "./deps.ts";
import { connectionOptions } from "./src/database/connection.ts";

const config: NessieConfig = {
  client: new ClientPostgreSQL(connectionOptions),
  migrationFolders: ["./src/database/migrations"],
  seedFolders: ["./src/database/seeds"],
  migrationTemplate: "./src/database/template/migration.ts",
  debug: false,
};

export default config;
