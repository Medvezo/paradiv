export default function Page({ params }: { params: { title: string } }) {
	const { title } = params;

	return (
		<main className="flex-1 flex flex-col items-center justify-start min-h-screen max-w-lg mx-auto">
			{title}
		</main>
	);
}
