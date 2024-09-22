"use client";
import { useQuery } from "convex/react";
import { api } from "@/../convex/_generated/api";
import { useEffect } from "react";
import PageHeader from "@/components/layout/PageHeader";

export default function ChatPage({ params }: { params: { id: string } }) {
	const { id } = params;

	const chat = useQuery(api.chats.getById, { _id: id });

	useEffect(() => {
		console.log(chat);
	}, [chat]);

	return (
		<div className="h-screen w-full flex flex-col justify-start flex-1 ">
			<PageHeader id={id} />
			<main className="flex-1 flex flex-col items-center justify-start min-h-[calc(100vh-10rem)] py-10 max-w-lg mx-auto">
				{chat?.content}
			</main>
		</div>
	);
}
