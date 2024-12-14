import { Id } from "./_generated/dataModel";
import { query, mutation } from "./_generated/server";
import { ConvexError, v } from "convex/values";

export const getAllChats = query({
	args: {},
	handler: async (ctx) => {
		const identity = await ctx.auth.getUserIdentity();
		if (!identity) {
			return [];
		}
		return await ctx.db
			.query("chats")
			.filter((q) => q.eq(q.field("userId"), identity.subject))
			.collect();
	},
});

export const getById = query({
	args: { _id: v.string() },
	handler: async (ctx, { _id }) => {
		const identity = await ctx.auth.getUserIdentity();
		if (!identity) {
			throw new ConvexError("Not authenticated");
		}

		const chat = await ctx.db
			.query("chats")
			.filter((q) => 
				q.and(
					q.eq(q.field("_id"), _id),
					q.eq(q.field("userId"), identity.subject)
				)
			)
			.first();

		if (!chat) {
			throw new ConvexError("Chat not found or unauthorized");
		}
		return chat;
	},
});

export const createChat = mutation({
	args: { title: v.string(), content: v.string() },
	handler: async (ctx, args) => {
		const identity = await ctx.auth.getUserIdentity();
		if (!identity) {
			throw new ConvexError("Not authenticated");
		}

		const newChatId = await ctx.db.insert("chats", {
			title: args.title,
			content: args.content,
			userId: identity.subject,
		});
		return newChatId;
	},
});

export const updateChat = mutation({
	args: {
		_id: v.string(),
		title: v.optional(v.string()),
		content: v.optional(v.string()),
		response: v.optional(v.string()),
	},
	handler: async (ctx, args) => {
		const identity = await ctx.auth.getUserIdentity();
		if (!identity) {
			throw new ConvexError("Not authenticated");
		}

		const existingChat = await ctx.db
			.query("chats")
			.filter((q) => 
				q.and(
					q.eq(q.field("_id"), args._id),
					q.eq(q.field("userId"), identity.subject)
				)
			)
			.first();

		if (!existingChat) {
			throw new ConvexError("Chat not found or unauthorized");
		}

		const updatedChat = await ctx.db.patch(args._id as Id<"chats">, {
			...(args.title && { title: args.title }),
			...(args.content && { content: args.content }),
			...(args.response && { response: args.response }),
		});
		return updatedChat;
	},
});

export const deleteChat = mutation({
	args: { _id: v.string() },
	handler: async (ctx, args) => {
		const identity = await ctx.auth.getUserIdentity();
		if (!identity) {
			throw new ConvexError("Not authenticated");
		}

		const chat = await ctx.db
			.query("chats")
			.filter((q) => 
				q.and(
					q.eq(q.field("_id"), args._id),
					q.eq(q.field("userId"), identity.subject)
				)
			)
			.first();

		if (!chat) {
			throw new ConvexError("Chat not found or unauthorized");
		}

		await ctx.db.delete(args._id as Id<"chats">);
		return true;
	},
});
