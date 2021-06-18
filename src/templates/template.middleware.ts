import { Context } from "../../types/context.ts";
export async function timingMiddleware(ctx: Context, next: () => Promise<unknown>) {
  ctx.response.body = { message: true }
}
