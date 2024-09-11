import MainForm from "@/components/forms/MainForm";
import Sidebar from "@/components/layout/Sidebar";

export default function Home() {
	return (
		<main className="flex ">
			<Sidebar />
			<section className="flex-1 flex flex-col items-center justify-start min-h-screen max-w-lg mx-auto">
				<MainForm />
			</section>
		</main>
	);
}
