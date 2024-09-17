import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const getAllChats = query({
	args: {},
	handler: async (ctx) => {
		return await ctx.db.query("chats").collect();
	},
});

export const getById = query({
	args: { _id: v.string() },
	handler: async (ctx, { _id }) => {
		const chat = await ctx.db
			.query("chats")
			.filter((q) => q.eq(q.field("_id"), _id))
			.first();
		return chat;
	},
});

export const createChat = mutation({
	args: { title: v.string(), content: v.string() },
	handler: async (ctx, args) => {
		const newChatId = await ctx.db.insert("chats", {
			title: args.title,
			content: args.content,
		});
		return newChatId;
	},
});
