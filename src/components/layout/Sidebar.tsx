"use client";

import { useQuery } from "convex/react";
import { api } from "@/../convex/_generated/api";
import Link from "next/link";
import { formatTitleToRoute } from "@/lib/utils";

export default function Sidebar({}) {
	const chats = useQuery(api.chats.get);

	return (
		<aside className="w-64 bg-gray-900 h-screen p-4">
			<h2 className="text-xl font-bold mb-4">Your Chats</h2>
			<ul className="flex flex-col gap-3">
				{chats?.length ? (
					chats.map((chat) => (
						<li key={chat.id}>
							<Link
								className="block bg-gray-700 hover:bg-gray-600 rounded-md px-3 py-2 w-full transition-colors"
								href={`/chat/${formatTitleToRoute(chat.id)}`}
							>
								{chat.title}
							</Link>
						</li>
					))
				) : (
					<li className="text-gray-400 italic">No chats available</li>
				)}
			</ul>
		</aside>
	);
}
