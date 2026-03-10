import { QueryClient, HydrationBoundary, dehydrate } from "@tanstack/react-query";

import { fetchNoteById } from "@/lib/api/clientApi";
import NotePreviewClient from "./NotePreview.client";

type Props = {
	params: Promise<{id: string}>;
};

const NoteDetails = async ({params}: Props) => {
	const queryClient = new QueryClient();
	const { id } = await params;

	queryClient.prefetchQuery({
		queryKey: ['note', id],
		queryFn: () => fetchNoteById({currentId: id})
	})

	return (
		<HydrationBoundary state={dehydrate(queryClient)}>
			<NotePreviewClient />
		</HydrationBoundary>
	);
}

export default NoteDetails;