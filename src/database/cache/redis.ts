import configs from "../../../configs.ts";
import { connect } from "../../../deps.ts";

export const redis = await connect({
  hostname: configs.database.redis.hostname,
  port: configs.database.redis.port,
});
