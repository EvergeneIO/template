import { Permissions, PermissionStrings } from "../constants/permissions.ts";


export function validatePermissions(permissionBits: bigint, permissions: PermissionStrings[]) {
    if (permissionBits & 1n) return true;

    return permissions.every(permission => permissionBits & BigInt(Permissions[permission]))
}
