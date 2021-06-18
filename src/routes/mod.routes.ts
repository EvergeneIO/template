/* export const routes: string[] = [];

for await (const file of Deno.readDir('./src/routes')) {
    if (!file.isFile) continue;
    if (file.name == "mod.routes.ts") continue;
    routes.push(file.name.split('.')[0])
} */
export { router as templateRoutes } from "./template.routes.ts"