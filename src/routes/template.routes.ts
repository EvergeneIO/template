import { Context, Router } from "../../deps.ts";

const router = new Router({ prefix: "/test" });

router.get('/', (ctx: Context) => {
    ctx.response.body = 'lol2'
})

export default router
