import { Application, Router, mam } from "./deps.ts";
import { version } from "./src/constants/version.ts";
import { configs } from "./src/config/configs.ts"
import { log } from "./src/utils/logger.ts";
import * as middlewares from "./src/middlewares/middlewares.ts";
import { router } from "./router.ts";

//Migrations
await Deno.run({
    cmd: ["deno", "run", "--allow-read", "--allow-net", "--allow-env", "--unstable", "https://deno.land/x/nessie@2.0.0-rc2/cli.ts", "migrate"]
})

log.setLevel(configs.logLevel ?? 1)

const app = new Application();


app.addEventListener("listen", ({ hostname, port }) => {
    console.log(
        `Listening on: http://${hostname ??
        "localhost"}:${port}`,
    );
});
// * Middlerwares
app.use(middlewares.loggerMiddleware);
app.use(middlewares.timingMiddleware);
app.use(middlewares.errorMiddleware);
app.use(middlewares.jwtMiddleware);

// Routers
app.use(router.routes());
app.use(router.allowedMethods());

// Static Routes (404 etc)
app.use(middlewares.notFound)

// App Login
app.listen({ port: configs.port, hostname: configs.host, })
