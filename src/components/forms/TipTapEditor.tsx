"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import CharacterCount from "@tiptap/extension-character-count";
import TipTapToolbar from "./TipTapToolbar";
import { useState, useEffect } from "react";

type TipTapEditorProps = {
	description: string;
	onChange: (value: string) => void;
};

const TipTapEditor = ({ description, onChange }: TipTapEditorProps) => {
	const [charCount, setCharCount] = useState(0);

	const editor = useEditor({
		extensions: [
			StarterKit,
			CharacterCount.configure({
				limit: 5000,
			}),
		],
		content: description,
		onUpdate: ({ editor }) => {
			const html = editor.getHTML();
			onChange(html);
			setCharCount(editor.storage.characterCount.characters());
		},
		editorProps: {
			attributes: {
				class:
					"border border-input bg-transparent rounded-md p-2 w-full min-h-[150px] max-h-[500px] overflow-y-auto focus:outline-none",
			},
		},
	});

	useEffect(() => {
		if (editor) {
			setCharCount(editor.storage.characterCount.characters());
		}
	}, [editor]);

	return (
		<div className="flex flex-col justify-start items-stretch gap-4 w-full max-w-3xl mx-auto">
			<TipTapToolbar editor={editor} />
			<EditorContent editor={editor} />
			<div className="text-sm text-gray-500 text-right">
				{charCount}/2000 characters
			</div>
		</div>
	);
};

export default TipTapEditor;
