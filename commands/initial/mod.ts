import { log } from "../../src/utils/logger.ts";

try {
    Deno.mkdirSync("./certs");
    log.info("Succes!")
} catch (e) {
    log.error(e);
}