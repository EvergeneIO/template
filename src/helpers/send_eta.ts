import { CallbackFn, renderFile } from "../../deps.ts";
import { Context } from "../types/mod.ts";
import { configs } from "../../configs.ts";

export async function sendEta(
  context: Context,
  fileName: string,
  // deno-lint-ignore no-explicit-any
  data?: { settings?: { [key: string]: any }; [key: string]: any },
  cb?: CallbackFn
) {
  try {
    const rendered = await renderFile(
      `${fileName}.ejs`,
      data ?? {},
      {
        views: "./src/frontend/views/",
        cache: configs.env !== "dev" ? true : false,
        //parse: { raw: "-" },
      },
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
