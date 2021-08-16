/* import db from "../../database/database.ts";
import { helpers, Router } from "../../deps.ts";
import { Context } from "../../types/context.ts";
import { sendEta } from "../utils/eta.ts";

export const router = new Router({ prefix: "/api/user" });

router.get("/", async (context: Context) => {
  // ctx.response.body = { test: true };
  // console.log(helpers.getQuery(ctx).test);
  const [res] = await db.select(db.test.username, db.test.premium).from(db.test).where(db.test.username.eq("newt"));

  await db.insertInto(db.test).values({ username: "", zahl: 123 });
});

export default router;
 */
