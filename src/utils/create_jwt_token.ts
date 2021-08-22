import { jwt } from "../../deps.ts";

const privateKey = await Deno.readTextFile("./certs/private.pem");

const header: jwt.Header = {
  alg: "RS512",
  typ: "JWT",
};

/**
 * @param expireTime in SECCONDS
 */
// deno-lint-ignore ban-types
export async function createJwtToken(content: {}, expireTime: number) {
  //TODO: Add Secret Config
  return await jwt.create(header, { ...content, iss: "evergene.io", exp: jwt.getNumericDate(expireTime) }, privateKey);
}
