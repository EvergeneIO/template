import { logger, formatTime } from "../utils/mod.ts";

export function createInterval(name: string, interval: number, fun: () => unknown) {
  logger.info(`Registering Interval ${name} which runs every ${formatTime(interval)}`);
  setTimeout(() => {
    fun();
    setInterval(() => {
      fun();
    }, interval);
  }, interval - (Date.now() % interval));
}

export default createInterval;
