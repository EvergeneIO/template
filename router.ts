import { Router } from "./deps.ts";

// import templateRouter from "./src/routes/template.routes.ts"
// import exampleRouter from "./src/routes/example.routes.ts"

export const router = new Router();

import { walk } from "https://deno.land/std@0.99.0/fs/walk.ts";
// FOLDER: api => prefix: "/api", web/frontend => prefix: "/" nicht schwer why 2 mal for schleife bin mir nicht sicher wie du meinenw
const walkEntries = walk("./src/routes", { includeDirs: false });

for await (const walkEntry of walkEntries) {
  const im = await import(`./${walkEntry.path}`);
  router.use(im.default.routes());
}

// import * as routers from "./src/routes/mod.routes.ts"
// console.log(routers)

// export const router = new Router();

// for (const route of Object.values(routers)) router.use(route.routes())
