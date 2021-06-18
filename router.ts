import { Router } from "./deps.ts";

// import templateRouter from "./src/routes/template.routes.ts"
// import exampleRouter from "./src/routes/example.routes.ts"

//export const routers: string[] = [];

/* for await (const file of Deno.readDir('./src/routes')) {
    if (!file.isFile) continue;
    if (file.name === "mod.routes.ts") continue;
    routers.push(file.name.split('.')[0])
} */

import * as routers from "./src/routes/mod.routes.ts"
console.log(routers)

export const router = new Router();

for (const route of Object.values(routers)) router.use(route.routes())