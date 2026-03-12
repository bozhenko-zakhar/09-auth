import { QueryClient, HydrationBoundary, dehydrate } from "@tanstack/react-query";

import { fetchNoteById } from "@/lib/api/serverApi";
import NoteDetailsClient from "./NoteDetails.client";
import { Metadata } from "next";

type Props = {
	params: Promise<{id: string}>;
};

export async function generateMetadata({params}: Props): Promise<Metadata> {
	const { id } = await params;
	const currentNote = await fetchNoteById({currentId: id});

	return {
		title: currentNote.title,
		description: currentNote.content.split(".")[0],
		openGraph: {
			title: currentNote.title,
			description: currentNote.content.split(".")[0],
			url: `https://08-zustand-sigma-rosy.vercel.app/notes/${currentNote.id}`,
			images: [{
				alt: "NoteHub card preview image",
				width: "1200",
				height: "630",
				url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg"
			}]
		}
	}
}

const NoteDetails = async ({params}: Props) => {
	const queryClient = new QueryClient();
	const { id } = await params;

	queryClient.prefetchQuery({
		queryKey: ['note', id],
		queryFn: () => fetchNoteById({currentId: id})
	})

	return (
		<HydrationBoundary state={dehydrate(queryClient)}>
			<NoteDetailsClient />
		</HydrationBoundary>
	);
}

export default NoteDetails;