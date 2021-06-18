import { copySync, existsSync } from "../../deps.ts";
import { log } from "../../src/utils/logger.ts";

export async function copy(name: string | undefined) {
    const fileName = `${name}.routes.ts`
    log.debug("starts copying a new router");
    if (await existsSync(`./src/routes/${fileName}`)) {
        log.error(`router ${fileName} already exists! please try again with a different name`)
        return;
    }
    await copySync("./src/templates/template.routes.ts", `./src/routes/${name}.routes.ts`);
    log.info(`the router ${fileName} was created`);
}

export default copy;