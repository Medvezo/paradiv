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
import { Button } from "../ui/button";

export default function MainForm() {
	const formSchema = z.object({
		title: z
			.string()
			.min(5, { message: "Title is not long enough" })
			.max(100, { message: "Title is too long" }),
		content: z.string(), // Add validation rules as needed
	});

	const form = useForm<z.infer<typeof formSchema>>({
		mode: "onChange",
		defaultValues: {
			title: "",
			content: "",
		},
		resolver: zodResolver(formSchema),
	});

	const onSubmit = (data: z.infer<typeof formSchema>) => {
		console.log(data);
	};

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="flex flex-col justify-start items-stretch gap-10 w-full max-w-3xl mx-auto"
			>
				<FormField
					control={form.control}
					name="title"
					render={({ field }) => (
						<FormItem className="w-full">
							<FormLabel>What is your paragraph about?</FormLabel>
							<FormControl>
								<Input placeholder="About something" {...field} />
							</FormControl>
							<FormDescription>Add a title to your paragraph</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="content" // Changed from "title" to "content"
					render={({ field }) => (
						<FormItem className="w-full">
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
				<Button type="submit">Submit</Button>
			</form>
		</Form>
	);
}
