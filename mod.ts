import { configs } from "./configs.ts";
import { Application } from "./deps.ts";
// deno-lint-ignore no-unused-vars
import { version } from "./src/constants/version.ts";
import { logger } from "./src/utils/mod.ts";
import * as middlewares from "./src/middlewares/middlewares.ts";
import { router } from "./router.ts";
import { StateContext } from "./src/types/mod.ts";

await import("./src/intervals/mod.ts");

//Migrations
const migration = Deno.run({
  cmd: [
    "deno",
    "run",
    "--allow-read",
    "--allow-net",
    "--allow-env",
    "--unstable",
    "--no-check",
    "https://deno.land/x/nessie@2.0.0/cli.ts",
    "migrate",
  ],
});

await migration.status();

logger.setLevel(configs.logLevel ?? 1);

const app = new Application<StateContext>();

app.addEventListener("listen", ({ hostname, port }) => {
  console.log(`Listening on: http://${hostname ?? "localhost"}:${port}`);
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
app.use(middlewares.fileMiddleware);
app.use(middlewares.notFound);

// App Login
app.listen({ port: configs.port, hostname: configs.host });
