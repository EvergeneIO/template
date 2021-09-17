import { configs } from "../../configs.ts";
import { createFernet } from "../../deps.ts";

export const fernet = createFernet(configs.fernetSecret);
