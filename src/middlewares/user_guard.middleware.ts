import { httpErrors } from "../../deps.ts";
import { Context } from "../types/mod.ts";
import { PermissionStrings } from "../constants/permissions.ts";
import { validatePermissions } from "../utils/mod.ts";

/**
 * Has user permission middleware
 * checks authorization for context user and user permissions if provided
 */
export function userGuard(...permissions: PermissionStrings[]) {
  return async function (context: Context, next: () => Promise<unknown>) {
    // If not logged in, throw error
    if (!context.state.user) {
      throw new httpErrors.Unauthorized("Unauthorized User");
    }

    // If permissions specified, then check logged in users permissions
    if (permissions && !validatePermissions(BigInt(context.state.user.permissions), permissions)) {
      throw new httpErrors.Forbidden("Missing access");
    }

    await next();
  };
}
