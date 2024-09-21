"use client";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/../convex/_generated/api";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useRouter } from "next/navigation";

export default function ChatPage({ params }: { params: { id: string } }) {
	const { id } = params;

	const router = useRouter();

	const chat = useQuery(api.chats.getById, { _id: id });

	useEffect(() => {
		console.log(chat);
	}, [chat]);

	// UPDATE CHAT
	const updateChat = useMutation(api.chats.updateChat);

	const handleUpdate = () => {
		updateChat({ _id: id, title: "New Title" });
	};

	// DELETE CHAT
	const deleteChat = useMutation(api.chats.deleteChat);

	const handleDelete = () => {
		deleteChat({ _id: id });
		router.push("/chats");
	};

	return (
		<div className="h-screen w-full flex flex-col justify-start flex-1 ">
			<header className="flex sticky top-0 justify-center items-center gap-20 w-full bg-zinc-700 ">
				<h2 className="text-xl font-bold text-amber-500">{chat?.title}</h2>

				<div className="flex gap-2">
					<Button
						variant={"ghost"}
						className="hover:bg-amber-600/90"
						onClick={handleUpdate}
					>
						<FaEdit className="text-destructive-foreground" />
					</Button>
					<Button
						variant={"ghost"}
						className="hover:bg-destructive/90"
						onClick={handleDelete}
					>
						<FaTrash className="text-destructive-foreground" />
					</Button>
				</div>
			</header>
			<main className="flex-1 flex flex-col items-center justify-start min-h-[calc(100vh-10rem)] py-10 max-w-lg mx-auto">
				{chat?.content}
			</main>
		</div>
	);
}
