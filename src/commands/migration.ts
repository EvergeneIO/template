import { copySync, format } from "../../deps.ts";
copySync("./src/templates/migration.ts", `./src/database/migrations/${format(new Date(Date.now()), "yyyyMMddHHmmss")}_${Deno.args[0]}.ts`);