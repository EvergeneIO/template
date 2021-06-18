import { jwt } from "../../deps.ts";
import { Context, User } from "../../types/context.ts";
const publicKey = await Deno.readTextFile("./certs/public.pem");

export async function getJwtPayload<T extends {}>(token: string): Promise<T | undefined> {
    return (await jwt.verify(token, publicKey, "RS512").catch(undefined)) as T;
}

export async function jwtMiddleware(ctx: Context, next: () => Promise<unknown>) {
    const token = ctx.cookies.get("token");

    if (token) {
        const payload = await getJwtPayload<User>(token);

        if (payload) ctx.state.user = payload;
    }

    return await next()
}
