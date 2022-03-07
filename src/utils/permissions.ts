import { Permissions, PermissionStrings } from "../constants/permissions.ts";

export function validatePermissions(permissionBits: bigint, permissions: PermissionStrings[], type: string) {
  if (permissionBits & Permissions.ADMIN) return true;
  if (type === "Client") if (!(permissionBits & Permissions.LOGIN)) return false;

  return permissions.every((permission) => permissionBits & Permissions[permission]);
}
