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
					"border border-input bg-transparent rounded-md p-2 min-w-[500px] w-full min-h-[250px] focus:outline-none",
			},
		},
	});

	return (
		<div className="flex flex-col justify-start items-center gap-4">
			<TipTapToolbar editor={editor} />
			<EditorContent editor={editor} />
		</div>
	);
};

export default TipTapEditor;
