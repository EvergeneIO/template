import { bcrypt } from "../../deps.ts";

export async function hashPassword(password: string) {
  return await bcrypt.hash(password, await bcrypt.genSalt(14));
}
