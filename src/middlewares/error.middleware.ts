import { isHttpError, Status, Context } from "../../deps.ts";
import { configs } from "../config/configs.ts";

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
      console.log(err);
    }

    ctx.response.status = status;
    ctx.response.body = { status, message };
  }
}