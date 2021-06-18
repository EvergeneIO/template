import { Context, Router } from "../../deps.ts";

export const router = new Router();

router.get('/', (ctx: Context) => {
    ctx.response.body = { test: true }
})

export default router