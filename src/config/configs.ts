import { dotEnvConfig } from "../../deps.ts";
import { Configs } from "../../types/configs.ts";
import { checkConfig } from "../helpers/config.ts";

dotEnvConfig({ export: true });

export const configs: Configs = {
    port: Number(Deno.env.get("PORT")) || 80,
    host: Deno.env.get("HOST") || "localhost",
    logLevel: Number(Deno.env.get("LOG_LEVEL")) ?? 1,
    databaseHost: checkConfig("DATABASE_HOST"),
    databasePort: Number(Deno.env.get("DATABASE_PORT")) || 5432,
    databaseUser: checkConfig("DATABASE_USER"),
    databasePassword: checkConfig("DATABASE_PASSWORD"),
    database: checkConfig("DATABASE"),
    env: checkConfig("ENV")
}


console.log(configs)
export default configs