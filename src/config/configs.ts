import { dotEnvConfig } from "../../deps.ts";

dotEnvConfig({ export: true })

export const configs = {
    port: Number(Deno.env.get("PORT")) ?? 80,
    host: Deno.env.get("HOST") ?? "localhost",
    logLevel: Number(Deno.env.get("LOG_LEVEL")) ?? 1,
    databaseHost: Deno.env.get("DATABASE_HOST"),
    databasePort: Number(Deno.env.get("DATABASE_PORT")) ?? 5432,
    databaseUser: Deno.env.get("DATABASE_USER"),
    databasePassword: Deno.env.get("DATABASE_PASSWORD"),
    database: Deno.env.get("DATABASE"),
}

export default configs