import { Pool } from "../../deps.ts";
import configs from "../config/configs.ts";
export const pool = new Pool(
    {
        database: configs.database,
        hostname: configs.databaseHost,
        user: configs.databaseUser,
        password: configs.databasePassword,
        port: configs.databasePort,
    },
    20,
    true,
);
