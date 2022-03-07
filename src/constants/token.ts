import { configs } from "../../configs.ts";
import { createFernet } from "../../deps.ts";

export const Client = createFernet(configs.fernet.client.secret);

export const Application = createFernet(configs.fernet.application.secret);

export const Bearer = createFernet(configs.fernet.bearer.secret);
