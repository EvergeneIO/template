import { Router } from "../../deps.ts";
import { Context } from "../types/context.ts";
import configs from "../../configs.ts";
import db from "../database/database.ts";
import { cachedSessions } from "../middlewares/fernet.middleware.ts";
import { userGuard } from "../middlewares/user_guard.middleware.ts";
import { sendEta } from "../helpers/send_eta.ts";
import { generateMaylily } from "../utils/maylily.ts";
import { quickId } from "../utils/quick_id.ts";
import { setTokens } from "../helpers/set_tokens.ts";

export const router = new Router();

router.post("/test", async (context: Context) => {
  context.response.body = { message: true };
  console.log(await context.request.body().value);
});

router.get("/register", async (context: Context) => {
  const id = await generateMaylily();
  const [user] = await db
    .insertInto(db.users)
    .values({ id, username: "Newt", permissions: 2n })
    .returning("id", "username", "permissions");
  const sessionId = quickId();
  //await db.insertInto(db.sessions).values({ userId: user.id, sessionId, exp: 1n });
  await setTokens({ ...user, sessionId }, context);

  context.response.body = { message: "you are now registerd!" };
});

router.get("/login", async (context: Context) => {
  if (!(await context.cookies.get("token"))) {
    const user = await db
      .select(db.users.id, db.users.permissions, db.users.username)
      .from(db.users)
      .where(db.users.username.eq("Newt"))
      .then((res) => res[0]);
    if (!user) context.throw(401, "User not found");

    const sessionId = quickId();
    await setTokens({ ...user, sessionId }, context);

    context.response.body = { message: `you are logged in as ${user.username}` };

    return;
  }
  context.response.body = { message: "you are already logged in!" };
});

router.get("/logout", async (context: Context) => {
  context.cookies.delete("token");
  context.cookies.delete("refresh_token");
  if (!context.state.user) return;
  const [deletedSession] = await db
    .deleteFrom(db.sessions)
    .where(
      db.sessions.userId.eq(BigInt(context.state.user.id)).and(db.sessions.sessionId.eq(context.state.user.sessionId))
    )
    .returning("sessionId");

  cachedSessions.delete(deletedSession.sessionId);

  context.response.redirect(configs.logoutRedirectUri);
});

router.get("/secret", userGuard("ADMIN"), (context: Context) => {
  context.response.body = { message: "DU BIST EINGELOGGT UND HAST ADMIN" };
});

router.get("/", async (context: Context) => {
  console.log(context.state.user);
  return await sendEta(context, "index", {
    user: context.state.user,
    page: { title: "User" },
  });
});

// delete sessino from db AND delete session from cachedSessions ja route
router.delete("/delete", async (ctx: Context) => {
  const body = await ctx.request.body({ type: "json" }).value;
  if (!body.id) ctx.throw(400, "id missing");

  const deletedSessions = await db
    .deleteFrom(db.sessions)
    .where(db.sessions.userId.eq(BigInt(body.id)))
    .returning("sessionId");
  for (const session of deletedSessions) {
    cachedSessions.delete(session.sessionId);
  }
});

router.get("/status", (context: Context) => {
  context.response.body = { message: true };
});

export default router;
