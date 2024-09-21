import { Id } from "./_generated/dataModel";
import { query, mutation } from "./_generated/server";
import { ConvexError, v } from "convex/values";

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

export const updateChat = mutation({
	args: {
		_id: v.string(),
		title: v.optional(v.string()),
		content: v.optional(v.string()),
	},
	handler: async (ctx, args) => {
		const chat = await getById(ctx, { _id: args._id });
		if (!chat) {
			throw new ConvexError("Chat not found");
		}
		const updatedChat = await ctx.db.patch(args._id as Id<"chats">, {
			...(args.title && { title: args.title }),
			...(args.content && { content: args.content }),
		});
		return updatedChat;
	},

});
