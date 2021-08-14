import { helpers, Router } from "../../deps.ts";
import { Context } from "../../types/context.ts";
import { sendEta } from "../utils/eta.ts";

export const router = new Router({ prefix: "/user" });

router.get("/", async (context: Context) => {
  // ctx.response.body = { test: true };
  // console.log(helpers.getQuery(ctx).test);
  return await sendEta(context, "var-example.ejs", { text: "world!" });
});

export default router;
