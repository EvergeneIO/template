import { Router } from "../../deps.ts";
import { Context } from "../types/mod.ts";

export const router = new Router()
  .get("/", (context: Context) => {
    context.response.body = "Test";
  })
  .post("/", (context: Context) => {
    context.response.body = "Test";
  })
  .delete("/", (context: Context) => {
    context.response.body = "Test";
  })
  .put("/", (context: Context) => {
    context.response.body = "Test";
  })
  .patch("/", (context: Context) => {
    context.response.body = "Test";
  });

export default router;
