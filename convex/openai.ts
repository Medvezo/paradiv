"use node";

import { action } from "./_generated/server";
import { v } from "convex/values";
import OpenAI from "../node_modules/openai";

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
            content: "Divide the given text into well-structured paragraphs. Do not add, remove, or modify any content except for paragraph breaks and minor grammar corrections. Do not include any additional commentary or explanations.",
          },
          {
            role: "user",
            content: `${content}`,
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