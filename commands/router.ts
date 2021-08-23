import { existsSync } from "../deps.ts";
import { logger } from "../src/utils/mod.ts";

export async function copy(name: string | undefined) {
  const fileName = `${name}.routes.ts`;
  logger.debug("starts writing a new router");
  if (existsSync(`./src/routes/${fileName}`)) {
    logger.error(`router ${fileName} already exists! please try again with a different name`);
    return;
  }
  const encoder = new TextEncoder();
  const data = encoder.encode(`
  import { Router } from "../../deps.ts";
  import { Context } from "../types/mod.ts";

  export const router = new Router({ prefix: "/template" }); 

  router.get("/", (context: Context) => {
    context.response.body = "template";
  });

  export default router;
  `);
  await Deno.writeFile(`./src/routes/${name}.routes.ts`, data);
  logger.info(`the router ${fileName} was created`);
}

export default copy;
