import { pool } from "../database/connection.ts";

// deno-lint-ignore ban-types
export async function runQuery<T extends {}>(
    query: string,
    // deno-lint-ignore no-explicit-any
    params?: any[]
): Promise<T[]> {
    const client = await pool.connect();

    const dbResult = await client.queryObject<T>({
        text: query,
        args: params,
    });

    client.release();

    return dbResult.rows;
}
