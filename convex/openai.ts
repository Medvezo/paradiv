"use node";

import { action } from "./_generated/server";
import { v } from "convex/values";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const divideIntoParagraphs = action({
  args: { content: v.string() },
  handler: async (ctx, args) => {
    const { content } = args;

    try {
      const completion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: "You are a helpful assistant that divides text into well-structured paragraphs.",
          },
          {
            role: "user",
            content: `Please divide the following text into paragraphs, maintaining the original content but improving its structure:\n\n${content}`,
          },
        ],
        max_tokens: 1000,
      });

      return completion.choices[0].message.content;
    } catch (error) {
      console.error("Error calling OpenAI API:", error);
      throw new Error("Failed to process the text");
    }
  },
});