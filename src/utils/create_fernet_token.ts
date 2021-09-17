/**
 * @param expireTime in ms
 */

import { fernet } from "../constants/token.ts";

// deno-lint-ignore ban-types
export function createFernetToken(content: {}) {
  return fernet.encode(JSON.stringify(content));
}
