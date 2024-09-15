"use client";
import { useQuery } from "convex/react";
import { api } from "@/../convex/_generated/api";
import { useEffect } from "react";

export default function ChatPage({ params }: { params: { id: string } }) {
	const { id } = params;

	const chat = useQuery(api.chats.getById, { _id: id });

	useEffect(() => {
		console.log(chat);
	}, [chat]);

	return (
		<main className="flex-1 flex flex-col items-center justify-start min-h-screen max-w-lg mx-auto">
			{chat?.content}
		</main>
	);
}
