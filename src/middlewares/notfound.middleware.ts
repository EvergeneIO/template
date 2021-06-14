import { Context } from "../../deps.ts";
export function notFound(ctx: Context) {
  ctx.response.status = 404
  ctx.response.body = {
    status: 404,
    message: `cannot ${ctx.request.method} ${ctx.request.url.pathname}`
  }
}
