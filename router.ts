import { Router } from "./deps.ts";

import templateRouter from "./src/routes/template.routes.ts"
import exampleRouter from "./src/routes/example.routes.ts"

export const router = new Router();

router.use(templateRouter.routes(), exampleRouter.routes())
