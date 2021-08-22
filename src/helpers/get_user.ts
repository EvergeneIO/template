import db from "../database/database.ts";

export async function getUser(id: bigint) {
  return await db
    .select(db.users.id, db.users.username, db.users.permissions)
    .from(db.users)
    .where(db.users.id.eq(BigInt(id)))
    .then((res) => res[0]);
}
