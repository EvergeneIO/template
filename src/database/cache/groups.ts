import db from "../database.ts";

export const Groups = new Map<string, bigint>();

export async function cacheGroups() {
  if (Groups.size === 0) {
    const groups = await db.select(db.groups.name, db.groups.permissions).from(db.groups);
    for (const group of groups) {
      Groups.set(group.name, group.permissions);
    }
  }
}
