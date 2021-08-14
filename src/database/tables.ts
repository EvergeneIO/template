import { mammoth } from "../../deps.ts";

export const users = mammoth.defineTable({
  id: mammoth.serial(),
  username: mammoth.text().notNull(),
});

// username:string, zahl:bigint, premium:bool,id:int
export const test = mammoth.defineTable({
  username: mammoth.text().notNull(),
  zahl: mammoth.integer().notNull(),
  premium: mammoth.boolean().default("FALSE"),
});
