import { PostgreSQLClientOptions, Pool, postgres, ConnectionOptions } from "../../deps.ts";
import configs from "../../configs.ts";

export const sql = postgres({
  database: configs.database.database,
  hostname: configs.database.host,
  port: configs.database.port,
  user: configs.database.user,
  password: configs.database.password,
  max: 20,
  types: {
    bigint: postgres.BigInt,
  },
});

export const pool = new Pool(
  {
    database: configs.database.database,
    hostname: configs.database.host,
    port: configs.database.port,
    user: configs.database.user,
    password: configs.database.password,
  },
  20,
  true
);

export const connectionOptions: ConnectionOptions = {
  database: configs.database.database,
  hostname: configs.database.host,
  port: configs.database.port,
  user: configs.database.user,
  password: configs.database.password,
};

export default pool;
