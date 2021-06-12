import { Pool } from "https://deno.land/x/postgres@v0.11.2/mod.ts"


const pool = new Pool(
    {
        database: "postgres",
        hostname: "127.0.0.1",
        user: "postgres",
        password: "DanaAkira2",
        port: 5432,
    },
    20,
    true // lazy pool
);

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

const res = await runQuery("2+2")
console.log(res)