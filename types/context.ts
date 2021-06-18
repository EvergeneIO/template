import { OakContext } from "../deps.ts";

export interface StateContext {

    user?: User

}

export type Context = OakContext<StateContext>

export interface User {
    username: string,
    groupes: string[],
    permissions: string
}