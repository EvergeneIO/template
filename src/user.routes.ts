/* import { helpers, Router } from "../../deps.ts";
import { Context } from "../../types/context.ts";
import { sendEta } from "../utils/eta.ts";
import {Test} from "../classes/Test.ts"

export const router = new Router({ prefix: "/api/user" });

router.get("/", async (context: Context) => {
  const test = new Test(context)
  test.req.secure
  // ctx.response.body = { test: true };
  // console.log(helpers.getQuery(ctx).test);
  return await sendEta(context, "var-example.ejs", { text: "world!" });
});

router.get("/profile", async (ctx: Context) => {
  ctx.response.body = { message: true };
});

export default router; */
