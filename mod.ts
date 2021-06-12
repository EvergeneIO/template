import { Application, Router } from "./deps.ts";
import { version } from "./version.ts";
import { configs } from "./src/config/configs.ts"
import { log, Loglevels } from "./src/utils/logger.ts";

log.setLevel(configs.logLevel ?? 1)

const app = new Application();

// Middlerwares
app.use(async (ctx, next) => {
    await next();
    const rt = ctx.response.headers.get("X-Response-Time");
    console.log(`${ctx.request.method} ${ctx.request.url} - ${rt}`);
});

// Routers

// Static Routes (404 etc)
app.use()

// App Login
app.listen({ port: configs.port, hostname: configs.host, })
console.log(`App is online on: ${configs.host}:${configs.port}`)