//import { Checkbox, Input, prompt as cliffyPrompt } from "../deps.ts";
import { copy as copyMigration } from "./migration.ts"
import { copy as copyRouter } from "./router.ts"
import { copy as copyMiddleware } from "./middleware.ts"
import { log } from "../src/utils/logger.ts"
import { configs } from "../src/config/configs.ts"

log.setLevel(configs.logLevel ?? 1)

import {
    Input,
    Select,
    prompt
} from "https://raw.githubusercontent.com/c4spar/deno-cliffy/prompt/windows-unicodes/prompt/mod.ts";

const result = await prompt([{
    name: "option",
    message: "What do you want to Create?",
    type: Select,
    options: ["router", "migration", "middleware"],
}, {
    name: "name",
    message: "What do you want to call the file?",
    type: Input,
}]);

switch (result.option) {
    case "migration":
        log.info("Start copying");
        copyMigration(result.name);
        break;

    case "router":
        log.info("Start copying")
        copyRouter(result.name)
        break;

    case "middleware":
        log.info("Start copying")
        copyMiddleware(result.name)
        break;
}
