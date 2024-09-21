"use client";

import { useQuery } from "convex/react";
import { api } from "@/../convex/_generated/api";
import Link from "next/link";
import { usePathname } from "next/navigation"; // Add this import

export default function Sidebar({}) {
	const chats = useQuery(api.chats.getAllChats);
	const pathname = usePathname(); // Get the router

	return (
		<aside className="flex gap-4 flex-col w-64 bg-gray-900 h-screen p-4 ">
			<h2 className="text-xl font-bold ">Your Chats</h2>
			<Link href="/" className="bg-amber-800 w-full px-3 py-2">
				+ Start new chat
			</Link>
			<ul className="flex flex-col gap-3">
				{chats?.length ? (
					chats.map((chat) => (
						<li key={chat._id}>
							<Link
								className={`block truncate hover:bg-gray-600 rounded-md px-3 py-2 w-full transition-colors ${pathname === `/chats/${chat._id}` ? "bg-gray-500" : "bg-gray-800"}`} // Add active class
								href={`/chats/${chat._id}`}
							>
								{chat.title}
							</Link>
						</li>
					))
				) : (
					<li className="text-gray-400 italic">No chats available</li>
				)}
				<Link
					href="/chats"
					className="mt-auto text-white font-bold py-2 px-4 underline hover:no-underline underline-offset-4 transition-all ease-in-out duration-300"
				>
					View All Chats
				</Link>
			</ul>
		</aside>
	);
}
