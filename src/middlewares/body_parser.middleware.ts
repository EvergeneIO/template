import { Context } from "../types/mod.ts";
import { logger } from "../utils/mod.ts";

export async function bodyParser(context: Context, next: () => Promise<unknown>) {
  if (context.request.hasBody) {
    logger.info(context.request.headers.get("content-type"));
    if (context.request.headers.get("content-type"))
      switch (context.request.headers.get("content-type")) {
        case "application/json":
          break;
        case "text/plain":
          break;

        default:
          break;
      }
    logger.info("lol");
    return await next();
  }
  await next();
}
