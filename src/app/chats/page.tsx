import type { Metadata } from "next";
import AllChats from "@/components/container/AllChats";

export const metadata: Metadata = {
	title: "All Chats",
	description: "View and manage all your text analysis sessions",
};

export default function ChatsPage() {

	return (
		<AllChats />
	);
}
