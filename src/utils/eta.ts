import { CallbackFn, PartialConfig, renderFile } from "../../deps.ts";
import { Context } from "../../types/context.ts";

export async function render(
  context: Context,
  // deno-lint-ignore no-explicit-any
  data?: { settings?: { [key: string]: any }; [key: string]: any },
  config?: PartialConfig,
  cb?: CallbackFn
) {
  try {
    const rendered = await renderFile(
      "layout.ejs",
      data ?? {},
      { views: "./src/frontend/views/", cache: true, ...config },
      cb
    );
    if (!rendered) context.throw(404);

    context.response.body = rendered;
    context.response.type = "text/html";
  } catch (error) {
    if (error.message.startsWith("Could not find the template")) context.throw(404);

    throw error;
  }
}
