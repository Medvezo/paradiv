"use client";

import { useQuery } from "convex/react";
import { api } from "@/../convex/_generated/api";
import Link from "next/link";

export default function Sidebar({}) {
	const chats = useQuery(api.chats.get);

	return (
		<aside className="w-64 bg-gray-900 h-screen p-4">
			<h2 className="text-xl font-bold mb-4">Your Chats</h2>
			<ul>
				{chats ? (
					chats.map((chat) => (
						<li key={chat.id} className="mb-2">
							<Link href={`/chat/${chat.id}`}>{chat.title}</Link>
						</li>
					))
				) : (
					<></>
				)}
			</ul>
		</aside>
	);
}
