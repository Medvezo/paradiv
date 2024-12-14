import type { Metadata } from "next";
import MainForm from "@/components/forms/MainForm";

export const metadata: Metadata = {
	title: "Create New Chat",
	description: "Start a new text analysis and let AI help structure your paragraphs",
};

export default function Home() {
	return (
		<main className="flex-1 flex flex-col items-center justify-start min-h-screen max-w-lg mx-auto">
			<MainForm />
		</main>
	);
}
