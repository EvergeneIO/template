import { PostgreSQLClientOptions, Pool } from "../../deps.ts";
import configs from "../config/configs.ts";

export const pool = new Pool(
  {
    database: configs.database,
    hostname: configs.databaseHost,
    port: configs.databasePort,
    user: configs.databaseUser,
    password: configs.databasePassword,
  },
  20,
  true
);

export const connectionOptions: PostgreSQLClientOptions = {
  database: configs.database,
  hostname: configs.databaseHost,
  port: configs.databasePort,
  user: configs.databaseUser,
  password: configs.databasePassword,
};

export default pool;
