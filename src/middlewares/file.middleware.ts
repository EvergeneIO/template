import { send } from "https://deno.land/x/oak@v7.5.0/send.ts";
import { Context } from "../../types/context.ts";
import { render } from "../utils/eta.ts";

export async function fileMiddleware(context: Context) {
  // FAVICON IS SOO COOL SO IT GETS ITS OWN SPECIAL PATH
  if (/^\/favicon.(png|ico)$/.test(context.request.url.pathname)) {
    return await send(context, "/images/favicon.png", { root: "./src/frontend/public" });
  }

  // NON ETA FILES SHOULD NOT BE RENDERED
  if (/\.(css|js|png|ico|woff2|wasm|svg)$/.test(context.request.url.pathname)) {
    return await send(context, context.request.url.pathname, { root: "./src/frontend/public" });
  }
  return await render(context, context.request.url.pathname, { path: context.request.url.pathname });
}
