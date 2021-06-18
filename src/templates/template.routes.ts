import { Context, Router } from "../../deps.ts";

export const router = new Router({ prefix: "/template" });

router.get('/', (ctx: Context) => {
    ctx.response.body = 'template'
})


export default router
