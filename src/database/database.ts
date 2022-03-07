import { mammoth } from "../../deps.ts";
import pool, { sql } from "./connection.ts";

import { logger } from "../utils/mod.ts";
import * as tables from "./tables.ts";

await sql`SELECT 1 + 1;`;

export const db = {
  // deno-lint-ignore no-explicit-any
  ...mammoth.defineDb(tables, async (query: string, params: any[]) => {
    logger.debug("[DATABASE] running query", query, params);

    const dbResult = await sql.unsafe(query, params);

    logger.debug("[DATABASE] query result", query, params, dbResult);

    return {
      rows: dbResult,
      affectedCount: dbResult.count,
    };
  }),
  ...mammoth,
};

// Automatically create nonexistent tables
// await db.createTables();

export default db;
//vandal

// deno-lint-ignore ban-types
export async function runQuery<T extends {}>(
  query: string,
  // deno-lint-ignore no-explicit-any
  params?: any[]
): Promise<T[]> {
  const client = await pool.connect();

  logger.debug("[DATABASE] running query", query, params);

  const dbResult = await client
    .queryObject<T>({
      text: query,
      args: params,
    })
    .catch((error) => {
      logger.error("[DATABASE]", query, params, "\n", error);
      return { rows: [] };
    });

  client.release();

  logger.debug("[DATABASE] query result", query, params, dbResult);

  return dbResult.rows;
}
