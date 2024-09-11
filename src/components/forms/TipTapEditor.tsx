"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TipTapToolbar from "./TipTapToolbar";

type TipTapEditorProps = {
	description: string;
	onChange: (value: string) => void;
};

const TipTapEditor = ({ description, onChange }: TipTapEditorProps) => {
	const editor = useEditor({
		extensions: [StarterKit],
		content: description,
		onUpdate: ({ editor }) => {
			onChange(editor.getHTML());
			console.log(editor.getHTML());
		},
		editorProps: {
			attributes: {
				class:
					"border border-input bg-transparent rounded-md p-2 w-full min-h-[150px] max-h-[500px] overflow-y-auto focus:outline-none",
			},
		},
	});

	return (
		<div className="flex flex-col justify-start items-stretch gap-4 w-full max-w-3xl mx-auto">
			<TipTapToolbar editor={editor} />
			<EditorContent editor={editor} />
		</div>
	);
};

export default TipTapEditor;
