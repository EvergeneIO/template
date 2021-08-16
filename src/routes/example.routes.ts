import { helpers, Router } from "../../deps.ts";
import { Context } from "../../types/context.ts";
import { render } from "../utils/eta.ts";

export const router = new Router({ prefix: "/user" });

router.get("/", async (context: Context) => {
  // ctx.response.body = { test: true };
  // console.log(helpers.getQuery(ctx).test);

  console.log("test");

  return await render(context, {
    route: "user",
    page: { title: "User" },
  });
});

export default router;
