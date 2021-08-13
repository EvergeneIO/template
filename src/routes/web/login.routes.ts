import { Router } from "../../../deps.ts";
import { Context } from "../../../types/context.ts";

export const router = new Router({ prefix: "/login" });

router.get("/", (ctx: Context) => {
  //if (ctx.request.session.user) return ctx.response.redirect('/');
  ctx.response.body = "yay";
});

export default router;
