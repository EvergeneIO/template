// deno-lint-ignore-file
/**
 * @param expireTime in ms
 */

export function createFernetToken(content: {}, type: any) {
  return type.encode(JSON.stringify(content));
}
