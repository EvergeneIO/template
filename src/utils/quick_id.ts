import { nanoid } from "../../deps.ts";

export function quickId(): string {
  return `${Date.now().toString(32)}.${nanoid()}`;
}
