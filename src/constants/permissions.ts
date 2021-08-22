export const Permissions = {
  USER: 1n << 0n,
  ADMIN: 1n << 1n,
} as const;

export type PermissionStrings = keyof typeof Permissions;
