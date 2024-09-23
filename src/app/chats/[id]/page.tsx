"use client";
import { useQuery, useMutation } from "convex/react";
import { api } from "@/../convex/_generated/api";
import { useCallback, useState } from "react";
import PageHeader from "@/components/layout/PageHeader";
import { Button } from "@/components/ui/button";

export default function ChatPage({ params }: { params: { id: string } }) {
	const { id } = params;
	const chat = useQuery(api.chats.getById, { _id: id });
	const updateChat = useMutation(api.chats.updateChat);
	// const divideIntoParagraphs = useAction(api.openai.divideIntoParagraphs);

	// Replace the actual divideIntoParagraphs with a mock function
	const divideIntoParagraphs = useCallback(() => {
		return new Promise<string>((resolve) => {
			setTimeout(() => {
				resolve(
					"This is a mocked response.\n\nIt divides the content into paragraphs.\n\nEach sentence is its own paragraph."
				);
			}, 5000);
		});
	}, []);
	const [isProcessing, setIsProcessing] = useState(false);
	const [dividedContent, setDividedContent] = useState<string | null>(null);

	const handleDivideIntoParagraphs = async () => {
		if (!chat?.content) return;

		setIsProcessing(true);
		try {
			const result = await divideIntoParagraphs();
			if (result) {
				setDividedContent(result);
				// Add the divided content as a new response
				await updateChat({
					_id: id,
					response: result,
				});
			}
		} catch (error) {
			console.error("Error dividing content into paragraphs:", error);
		} finally {
			setIsProcessing(false);
		}
	};

	return (
		<div className="h-screen w-full flex flex-col justify-start flex-1">
			<PageHeader id={id} />
			<main className="flex-1 flex flex-col items-center justify-start min-h-[calc(100vh-10rem)] py-10 max-w-3xl mx-auto px-4">
				<div className="w-full mb-6 bg-gray-800 p-4 rounded-md shadow-md">
					<h3 className="text-lg font-semibold text-amber-300 mb-2">Original Content:</h3>
					<div className="text-white whitespace-pre-wrap leading-relaxed text-lg">{chat?.content}</div>
				</div>
				{dividedContent && (
					<div className="w-full mt-6 bg-gray-700 p-4 rounded-md shadow-md">
						<h3 className="text-lg font-semibold text-amber-300 mb-2">AI Response (Divided Paragraphs):</h3>
						<div className="text-white whitespace-pre-line text-lg leading-relaxed">{dividedContent}</div>
					</div>
				)}
				<Button
					onClick={handleDivideIntoParagraphs}
					disabled={isProcessing}
					className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-6"
				>
					{isProcessing ? "Processing..." : "Divide into Paragraphs"}
				</Button>
			</main>
		</div>
	);
}
