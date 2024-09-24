"use client";

import { useEffect, useState } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "@/../convex/_generated/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FaArrowLeft, FaEdit, FaTrash } from "react-icons/fa";
import { useRouter } from "next/navigation";
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Label } from "@/components/ui/label";

interface PageHeaderProps {
	id: string;
}

export default function PageHeader({ id }: PageHeaderProps) {
	const router = useRouter();
	const chat = useQuery(api.chats.getById, { _id: id });
	const [newTitle, setNewTitle] = useState(chat?.title || "");
	const [isEditOpen, setIsEditOpen] = useState(false);
	const [isDeleteOpen, setIsDeleteOpen] = useState(false);

	//* Updating title whenever title is loaded from DB
	useEffect(() => {
		setNewTitle(chat?.title || "");
	}, [chat?.title]);

	// UPDATE CHAT
	const updateChat = useMutation(api.chats.updateChat);

	const handleUpdate = () => {
		updateChat({ _id: id, title: newTitle });
		setIsEditOpen(false);
	};

	// DELETE CHAT
	const deleteChat = useMutation(api.chats.deleteChat);

	const handleDelete = () => {
		deleteChat({ _id: id });
		setIsDeleteOpen(false);
		router.push("/");
	};

	return (
		<header className="flex sticky top-0 justify-between items-center w-full backdrop-blur-3xl px-4 border-b border-white/10 py-1">
			<Button
				variant="ghost"
				className="hover:bg-white/10"
				onClick={() => router.back()}
			>
				<FaArrowLeft className="text-white" />
			</Button>

			<h2 className="text-xl font-bold text-amber-500">{chat?.title}</h2>

			<div className="flex gap-2">
				<AlertDialog open={isEditOpen} onOpenChange={setIsEditOpen}>
					<AlertDialogTrigger asChild>
						<Button variant="ghost" className="hover:bg-amber-600/90">
							<FaEdit className="text-destructive-foreground" />
						</Button>
					</AlertDialogTrigger>
					<AlertDialogContent className="opacity-100 bg-black">
						<AlertDialogHeader>
							<AlertDialogTitle>Edit Chat Title</AlertDialogTitle>
							<AlertDialogDescription>
								Enter a new title for your chat.
							</AlertDialogDescription>
						</AlertDialogHeader>
						<div className="grid gap-4 py-4">
							<div className="grid grid-cols-4 items-center gap-4">
								<Label htmlFor="name" className="text-right">
									Title
								</Label>
								<Input
									id="name"
									value={newTitle}
									onChange={(e) => setNewTitle(e.target.value)}
									className="col-span-3"
								/>
							</div>
						</div>
						<AlertDialogFooter>
							<AlertDialogCancel>Cancel</AlertDialogCancel>
							<AlertDialogAction onClick={handleUpdate}>
								Save changes
							</AlertDialogAction>
						</AlertDialogFooter>
					</AlertDialogContent>
				</AlertDialog>

				<AlertDialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
					<AlertDialogTrigger asChild>
						<Button variant="ghost" className="hover:bg-destructive/90">
							<FaTrash className="text-destructive-foreground" />
						</Button>
					</AlertDialogTrigger>
					<AlertDialogContent className="opacity-100 bg-black">
						<AlertDialogHeader>
							<AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
							<AlertDialogDescription>
								This action cannot be undone. This will permanently delete your
								chat and remove its data from our servers.
							</AlertDialogDescription>
						</AlertDialogHeader>
						<AlertDialogFooter>
							<AlertDialogCancel>Cancel</AlertDialogCancel>
							<AlertDialogAction onClick={handleDelete}>
								Delete
							</AlertDialogAction>
						</AlertDialogFooter>
					</AlertDialogContent>
				</AlertDialog>
			</div>
		</header>
	);
}
