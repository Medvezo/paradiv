"use client";

import { useForm } from "react-hook-form";
import * as z from "zod";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import TipTapEditor from "./TipTapEditor";

export default function MainForm() {
	const formSchema = z.object({
		title: z
			.string()
			.min(5, { message: "Title is not long enough" })
			.max(100, { message: "Title is too long" }),
	});

	const form = useForm<z.infer<typeof formSchema>>({
		mode: "onChange",
		defaultValues: {
			title: "",
		},
		resolver: zodResolver(formSchema),
	});

	return (
		<Form {...form}>
			<FormField
				control={form.control}
				name="title"
				render={({ field }) => (
					<FormItem>
						<FormLabel>Title</FormLabel>
						<FormControl>
							<Input placeholder="shadcn" {...field} />
						</FormControl>
						<FormDescription>Add title</FormDescription>
						<FormMessage />
					</FormItem>
				)}
			/>
			<FormField
				control={form.control}
				name="title"
				render={({ field }) => (
					<FormItem>
						<FormLabel>Text editor</FormLabel>
						<FormControl>
							<TipTapEditor
								description={field.value}
								onChange={field.onChange}
							/>
						</FormControl>
						<FormMessage />
					</FormItem>
				)}
			/>
		</Form>
	);
}
