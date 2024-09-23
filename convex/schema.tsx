import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  chats: defineTable({
    content: v.string(),
    response: v.string(),
    title: v.string(),
  }),
});