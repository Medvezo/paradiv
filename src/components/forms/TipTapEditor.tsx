"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

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
				class: "prose prose-sm sm:prose lg:prose-lg xl:prose-2xl",
			},
		},
	});

	return (
		<div className="flex flex-col justify-start items-center min-h-[250px]">
			<EditorContent editor={editor} />;
		</div>
	);
};

export default TipTapEditor;
