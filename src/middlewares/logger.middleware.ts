import { Context, brightGreen, brightBlue, brightYellow, brightRed, green, yellow, blue, white, red, bold } from "../../deps.ts";
export async function loggerMiddleware(ctx: Context, next: () => Promise<unknown>) {
  await next();
  const reqTime = ctx.response.headers.get("X-Response-Time");
  const status = ctx.response.status;
  const method = ctx.request.method
  let color
  let code
  if (status >= 200 && status < 300) {
    code = brightGreen
  } else if (status >= 300 && status < 400) {
    code = brightBlue
  } else if (status >= 400 && status < 500) {
    code = brightYellow
  } else {
    code = brightRed
  }
  switch (method) {
    case "GET":
      color = green
      break
    case "POST":
      color = yellow
      break
    case "PUT":
      color = blue
      break
    case "PATCH":
      color = white
      break
    case "DELETE":
      color = red
      break
    default:
      color = white
      break
  }
  console.log(color(bold(`${ctx.request.method} `)) + `${ctx.request.url.pathname} ` + code(`${status} `) + `${reqTime}`);
}