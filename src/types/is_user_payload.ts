import { Application, Bearer, User } from "./mod.ts";

export function isUserPayload(type: string, payload: User | Application | Bearer): payload is User {
  return type === "Client";
}
