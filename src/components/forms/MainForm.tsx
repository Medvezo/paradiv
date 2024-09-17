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
import { formatTitleToRoute } from "@/lib/utils";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/../convex/_generated/api";
import { useToast } from "@/hooks/use-toast";

export default function MainForm() {
	const { toast } = useToast();
	const chats = useQuery(api.chats.getAllChats);

	const formSchema = z.object({
		title: z
			.string()
			.min(5, { message: "Title is not long enough" })
			.max(100, { message: "Title is too long" })
			.refine(
				//TODO: Rewrite this refine part
				(title) => {
					const formattedRoute = formatTitleToRoute(title);
					return !chats?.some(
						(chat) => formatTitleToRoute(chat.title) === formattedRoute
					);
				},
				{ message: "A chat with this title already exists" }
			),

		content: z
			.string()
			.min(100, { message: "Text is too short" })
			.max(2000, { message: "Text is too long" }),
	});

	const form = useForm<z.infer<typeof formSchema>>({
		mode: "onChange",
		defaultValues: {
			title: "",
			content: "",
		},
		resolver: zodResolver(formSchema),
		context: { chats },
	});

	const createChat = useMutation(api.chats.createChat);

	const onSubmit = (data: z.infer<typeof formSchema>) => {
		try {
			const response = createChat({ title: data.title, content: data.content });
			console.log("Chat created with response: ", response);
			toast({
				title: "Chat created successfully",
				description: `Your chat "${data.title}" has been created.`,
				variant: "success"
			});

			// Reset form after successful submission
			form.reset();

			//TODO: You might want to redirect the user here
		} catch (error) {
			console.error("Error on Submitting Main Form: ", error);
			toast({
				title: "Error",
				description: "Failed to create chat. Please try again.",
				variant: "destructive",
			});
		}
	};

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="flex flex-col justify-start items-stretch gap-10 w-full max-w-3xl mx-auto mt-10"
			>
				<FormField
					control={form.control}
					name="title"
					render={({ field }) => (
						<FormItem className="w-full">
							<FormLabel>What is your paragraph about?</FormLabel>
							<FormControl>
								<Input required placeholder="About something" {...field} />
							</FormControl>
							<FormDescription>Add a title to your paragraph</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="content"
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
				<Button type="submit" disabled={!form.formState.isValid}>
					Submit
				</Button>
			</form>
		</Form>
	);
}
