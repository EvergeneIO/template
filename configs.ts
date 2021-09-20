import { dotEnvConfig } from "./deps.ts";
import { Configs } from "./src/types/mod.ts";
import { checkConfig } from "./src/helpers/check_config.ts";

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
  fernetSecret: checkConfig("FERNET_SECRET"),
  accessTokenLiveTime: Number(Deno.env.get("ACCESS_TOKEN_LIFE_TIME")) ?? 300,
  refreshTokenLiveTime: Number(Deno.env.get("REFRESH_TOKEN_LIFE_TIME")) ?? 36000,
  logoutRedirectUri: checkConfig("LOGOUT_REDIRECT_URI"),
  env: checkConfig("ENV"),
};

export default configs;
