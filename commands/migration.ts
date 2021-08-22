import { copySync, existsSync, format } from "../deps.ts";
import { logger } from "../src/utils/mod.ts";
export async function copy(name: string | undefined) {
  const fileName = `${format(new Date(Date.now()), "yyyyMMddHHmmss")}_${name}.ts`;
  logger.debug("starts copying a new migration");
  if (existsSync(`./src/database/migrations/${fileName}`)) {
    logger.error(`migration ${fileName} already exists! please try again with a different name`);
    return;
  }
  await copySync("./src/templates/migration/migration.ts", `./src/database/migrations/${fileName}`);
  logger.info(`the migration ${fileName} was created`);
}

export default copy;
