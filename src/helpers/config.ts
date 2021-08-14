import { config } from "https://deno.land/x/dotenv@v2.0.0/mod.ts";
import { Configs } from "../../types/configs.ts";

export function checkConfig(config: string) {
  const conf = Deno.env.get(config);
  if (conf === undefined) throw new Error("something wrong with config");
  return conf;
}
