"use client";

import { Toggle } from "../ui/toggle";
import { Bold, Italic, List, ListOrdered, Heading2 } from "lucide-react";
import { type Editor } from "@tiptap/react";

type TipTapToolbarProps = {
	editor: Editor;
};

export default function TipTapToolbar({ editor }: TipTapToolbarProps) {
	if (!editor) return null;

	return (
		<div className="border border-input bg-transparent rounded-md p-2 flex flex-row justify-start items-center gap-2">
			<Toggle
				size={"sm"}
				pressed={editor.isActive("bold")}
				onPressedChange={() => editor.chain().toggleBold().run()}
			>
				<Bold />
			</Toggle>
			<Toggle
				size={"sm"}
				pressed={editor.isActive("italic")}
				onPressedChange={() => editor.chain().toggleItalic().run()}
			>
				<Italic />
			</Toggle>
			<Toggle
				size={"sm"}
				pressed={editor.isActive("bulletList")}
				onPressedChange={() => editor.chain().toggleBulletList().run()}
			>
				<List />
			</Toggle>
			<Toggle
				size={"sm"}
				pressed={editor.isActive("orderedList")}
				onPressedChange={() => editor.chain().toggleOrderedList().run()}
			>
				<ListOrdered />
			</Toggle>
			<Toggle
				size={"sm"}
				pressed={editor.isActive("heading")}
				onPressedChange={() => editor.chain().toggleHeading({ level: 2 }).run()}
			>
				<Heading2 />
			</Toggle>
		</div>
	);
}
