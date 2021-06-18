import { copySync, existsSync, format } from "../../deps.ts";
import { log } from "../../src/utils/logger.ts"
export async function copy(name: string | undefined) {
    const fileName = `${format(new Date(Date.now()), "yyyyMMddHHmmss")}_${name}.ts`
    log.debug("starts copying a new migration");
    if (existsSync(`./src/database/migrations/${fileName}`)) {
        log.error(`migration ${fileName} already exists! please try again with a different name`)
        return;
    }
    await copySync("./src/templates/template.middleware.ts", `./src/middlewares/${fileName}`);
    log.info(`the migration ${fileName} was created`);
}

export default copy;