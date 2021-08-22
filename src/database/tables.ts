import { mammoth } from "../../deps.ts";

export const users = mammoth.defineTable({
  id: mammoth.bigint().primaryKey(),
  username: mammoth.text().notNull(),
  permissions: mammoth.bigint().notNull().default("1"),
});

// username:string, zahl:bigint, premium:bool,id:int
export const test = mammoth.defineTable({
  username: mammoth.text().notNull(),
  zahl: mammoth.integer().notNull(),
  premium: mammoth.boolean().default("FALSE"),
});

export const sessions = mammoth.defineTable({
  userId: mammoth.bigint().primaryKey(),
  sessionId: mammoth.text().primaryKey(),
  exp: mammoth.bigint().notNull(),
});
