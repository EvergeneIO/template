//import { Checkbox, Input, prompt as cliffyPrompt } from "../deps.ts";
import { copy as copyMigration } from "./migration.ts";
import { copy as copyRouter } from "./router.ts";
import { logger } from "../src/utils/mod.ts";
import { configs } from "../configs.ts";

logger.setLevel(configs.general.env === "dev" ? 0 : 1);

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
    options: ["router", "migration"],
  },
  {
    name: "name",
    message: "What do you want to call the file?",
    type: Input,
  },
]);

switch (result.option) {
  case "migration":
    logger.info("Start writing");
    copyMigration(result.name);
    break;

  case "router":
    logger.info("Start writing");
    copyRouter(result.name);
    break;
}
