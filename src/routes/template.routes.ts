import { Router, jwt } from "../../deps.ts";
import { Context } from "../../types/context.ts";
import { userGuard } from "../middlewares/user_guard.middleware.ts";

const privateKey = await Deno.readTextFile("./certs/private.pem");

export const router = new Router();

router.get("/", async (ctx: Context) => {
  const token = await jwt.create(
    { alg: "RS512", typ: "JWT" },
    {
      username: "Newt",
      groups: ["Admin", "User", "Tester"],
      permissions: "92",
    },
    privateKey
  );
  ctx.cookies.set("token", token);
  ctx.response.body = token;
});

router.get("/test", (ctx: Context) => {
  ctx.response.body = { message: true };
});

/**
 * @ Route Secret
 * description: get your username
 * params: 0
 * etc....
 */

router.get("/secret", userGuard("SOME_OTHER"), (ctx: Context) => {
  ctx.response.body = {
    username: ctx.state.user?.username,
  };
});

export default router;
