import { isHttpError, Status } from "../../deps.ts";
import { Context } from "../types/mod.ts";
import { configs } from "../../configs.ts";
import { logger } from "../utils/mod.ts";

export async function errorMiddleware(ctx: Context, next: () => Promise<unknown>) {
  try {
    await next();
  } catch (err) {
    let message = err.message;
    const status = err.status || err.statusCode || Status.InternalServerError;

    /**
     * considering all unhandled errors as internal server error,
     * do not want to share internal server errors to
     * end user in non "development" mode
     */
    if (!isHttpError(err)) {
      message = configs.env === "dev" || configs.env === "development" ? message : "Internal Server Error";
    }

    if (configs.env === "dev" || configs.env === "development") {
      logger.error(err);
    }

    ctx.response.status = status;
    ctx.response.body = { status, message };
  }
}
