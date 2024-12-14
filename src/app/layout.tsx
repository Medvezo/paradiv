import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Providers } from "./providers";
import Sidebar from "@/components/layout/Sidebar";
import { Toaster } from "@/components/ui/toaster";


const geistSans = localFont({
	src: "./fonts/GeistVF.woff",
	variable: "--font-geist-sans",
	weight: "100 900",
});
const geistMono = localFont({
	src: "./fonts/GeistMonoVF.woff",
	variable: "--font-geist-mono",
	weight: "100 900",
});

export const metadata: Metadata = {
	title: {
		default: "ParaDiv - AI Text Divider",
		template: "%s | ParaDiv"
	},
	description: "Intelligently divide your text into well-structured paragraphs using AI",
	keywords: ["AI", "text analysis", "paragraph divider", "writing tool"],
	authors: [{ name: "ParaDiv" }],
	openGraph: {
		title: "ParaDiv - AI Text Divider",
		description: "Intelligently divide your text into well-structured paragraphs using AI",
		type: "website",
		siteName: "ParaDiv",
	},
	icons: {
		icon: "/favicon.ico",
		apple: [
			{ url: "/apple-touch-icon.png", sizes: "180x180" },
		],
	},
	manifest: "/site.webmanifest",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased`}
			>
				<Providers>
					<div className="flex h-screen overflow-hidden">
						<Sidebar />
						<main className="flex-1 overflow-y-auto bg-gray-800">{children}</main>
					</div>
					<Toaster />
				</Providers>
			</body>
		</html>
	);
}
