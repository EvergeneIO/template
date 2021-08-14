import { mammoth, Pool } from "./deps.ts";

// import logger from '../utils/logger.ts'
import * as tables from "./tables.ts";

const POOL_CONNECTIONS = 20;
const pool = new Pool(
  {
    hostname: "DATABASE_HOSTNAME",
    port: "DATABASE_PORT",
    database: "DATABASE",
    user: "DATABASE_USER",
    password: "DATABASE_PASSWORD",
  },
  POOL_CONNECTIONS,
  true
);

// deno-lint-ignore ban-types
export async function runQuery<T extends {}>(
  query: string,
  // deno-lint-ignore no-explicit-any
  params?: any[]
): Promise<T[]> {
  const client = await pool.connect();

  //logger.debug('[DATABASE] running query', query, params)

  const dbResult = await client
    .queryObject<T>({
      text: query,
      args: params,
    })
    .catch(() => {
      //logger.error('[DATABASE]', query, params, '\n', error)
      return { rows: [] };
    });

  client.release();

  //logger.debug('[DATABASE] query result', query, params, dbResult)

  return dbResult.rows;
}

export const db = {
  // deno-lint-ignore no-explicit-any
  ...mammoth.defineDb(tables, async (query: string, params: any[]) => {
    const client = await pool.connect();

    //logger.debug('[DATABASE] running query', query, params)

    const dbResult = await client
      .queryObject({
        text: query,
        args: params,
      })
      .catch(() => {
        //logger.error('[DATABASE]', query, params, '\n', error)
        return { error: true, rows: [], rowCount: 0 };
      });

    client.release();

    //logger.debug('[DATABASE] query result', query, params, dbResult)

    return {
      rows: dbResult.rows,
      affectedCount: dbResult.rowCount ?? dbResult.rows.length,
    };
  }),
  ...mammoth,
  runQuery,
};

// Automatically create nonexistent tables
await db.createTables();

export default db;
