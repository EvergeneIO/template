import { configs } from "./configs.ts";
import { Application, createFernet } from "./deps.ts";
// deno-lint-ignore no-unused-vars
import { version } from "./src/constants/version.ts";
import { formatTime, logger } from "./src/utils/mod.ts";
import * as middlewares from "./src/middlewares/middlewares.ts";
import { router } from "./router.ts";
import { StateContext } from "./src/types/mod.ts";
import { redis } from "./src/database/cache/redis.ts";
import { cacheGroups } from "./src/database/cache/groups.ts";
import { RateLimiter } from "./src/middlewares/middlewares.ts";

const start = Date.now();

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

await cacheGroups();

export const ratelimit = RateLimiter({
  max: 1,
});

if (!redis.isConnected) throw new Error("Could not Connect to Redis");

logger.setLevel(configs.general.env === "dev" ? 0 : 1);

const app = new Application<StateContext>();

app.addEventListener("listen", ({ port }) => {
  logger.info(
    `Server is Ready and Listen on ${configs.general.hostname == "localhost" ? "http" : "https"}://${
      configs.general.hostname
    }:${port} || ${formatTime(Date.now() - start)}`
  );
});
// * Middlerwares
app.use(middlewares.loggerMiddleware);
app.use(middlewares.timingMiddleware);
app.use(middlewares.errorMiddleware);
app.use(middlewares.fernetMiddleware);

// Routers
app.use(router.routes());
app.use(router.allowedMethods());

// Static Routes (404 etc)
app.use(middlewares.fileMiddleware);
app.use(middlewares.notFound);

// App Login
app.listen({ port: configs.general.port });
