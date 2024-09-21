"use client";

import { useQuery } from "@/../convex/react";
import { api } from "@/../convex/_generated/api";
import Link from 'next/link';

export default function ChatsPage() {
	const chats = useQuery(api.chats.getAllChats);

	return (
		<div className="p-6 bg-gray-800 rounded-lg shadow-md h-full">
			<h1 className="text-3xl font-bold text-center text-gray-200 mb-6">Chats</h1>
			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
				{chats?.map((chat) => (
					<Link key={chat._id} href={`/chats/${chat._id}`} className="block p-4 bg-gray-700 rounded-lg shadow hover:bg-gray-600 transition duration-150 ease-in-out">
						<h2 className="text-xl font-semibold text-gray-200 mb-2">{chat.title}</h2>
						<p className="text-gray-400 text-sm mb-1 max-h-[60px] overflow-hidden">Last message: {chat.content || 'No messages yet'}</p>
						<p className="text-gray-400 text-sm">Created: {new Date(chat._creationTime).toLocaleDateString()}</p>
					</Link>
				))}
			</div>
		</div>
	);
}
