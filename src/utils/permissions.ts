import { Permissions, PermissionStrings } from "../constants/permissions.ts";

export function validatePermissions(permissionBits: bigint, permissions: PermissionStrings[]) {
  if (permissionBits & Permissions.ADMIN) return true;

  return permissions.every((permission) => permissionBits & Permissions[permission]);
}
