export enum Permissions {
    ADMIN = 1 << 0,
    USER = 1 << 1,
    SOME_OTHER = 1 << 2,
    MORE = 1 << 3,
}

export type PermissionStrings = keyof typeof Permissions;
