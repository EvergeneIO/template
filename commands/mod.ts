//import { Checkbox, Input, prompt as cliffyPrompt } from "../deps.ts";
import { copy as copyMigration } from "./migration.ts";
import { copy as copyRouter } from "./router.ts";
import { copy as copyMiddleware } from "./middleware.ts";
import { logger } from "../src/utils/mod.ts";
import { configs } from "../configs.ts";

logger.setLevel(configs.logLevel ?? 1);

import {
  Input,
  Select,
  prompt,
} from "https://raw.githubusercontent.com/c4spar/deno-cliffy/prompt/windows-unicodes/prompt/mod.ts";

const result = await prompt([
  {
    name: "option",
    message: "What do you want to Create?",
    type: Select,
    options: ["router", "migration", "middleware"],
  },
  {
    name: "name",
    message: "What do you want to call the file?",
    type: Input,
  },
]);

switch (result.option) {
  case "migration":
    logger.info("Start copying");
    copyMigration(result.name);
    break;

  case "router":
    logger.info("Start copying");
    copyRouter(result.name);
    break;

  case "middleware":
    logger.info("Start copying");
    copyMiddleware(result.name);
    break;
}
