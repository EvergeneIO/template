import { fernet } from "../../mod.ts";

/**
 * @param expireTime in ms
 */
// deno-lint-ignore ban-types
export function createFernetToken(content: {}) {
  return fernet.encode(JSON.stringify(content));
}
