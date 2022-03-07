export const Permissions = {
  ADMIN: 1n << 0n,
  LOGIN: 1n << 1n,
  USER: 1n << 2n,
} as const;

export const Scopes = {
  "USER.READ": 1n << 0n,
  "USER.WRITE": 1n << 1n,
} as const;

export const DEFAULT_PERMISSIONS = 2n;

export type PermissionStrings = keyof typeof Permissions;
export type ScopeStrings = keyof typeof Scopes;
