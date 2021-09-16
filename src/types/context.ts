import { OakContext } from "../../deps.ts";

export interface StateContext {
  user?: User;
}

export type Context = OakContext<StateContext>;

export interface User {
  id: bigint;
  permissions: bigint;
  username: string;
  sessionId: string;
  expires: number;
}
