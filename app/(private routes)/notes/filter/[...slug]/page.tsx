import { QueryClient, HydrationBoundary, dehydrate } from '@tanstack/react-query';
import { Metadata } from 'next';
import { fetchNotes, fetchNotesByCategory } from '@/lib/api';
import NotesClient from './Notes.client';
import { NoteTag } from '@/types/note';

type Props = {
	params: Promise<{slug: string[]}>;
}

export async function generateMetadata({params}: Props): Promise<Metadata> {
	const { slug } = await params;
	const category = slug[0] === 'all' ? undefined : slug[0] as NoteTag

	return {
		title: category ? `NoteHub ${category} Notes` : undefined,
		description: `NoteHub application with filtered notes by «${category}» category`,
		openGraph: {
			title: category ? `NoteHub ${category} Notes` : undefined,
			description: `NoteHub application with filtered notes by «${category}» category`,
			url: `https://08-zustand-sigma-rosy.vercel.app/notes/filter/${category}`,
			images: [{
				alt: "NoteHub preview image",
				width: "1200",
				height: "630",
				url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg"
			}]
		}
	}
}

export default async function Notes({params}: Props) {
	const { slug } = await params;
	const category = slug[0] === 'all' ? undefined : slug[0] as NoteTag

	const queryClient = new QueryClient();

	await queryClient.prefetchQuery({
		queryKey: ['notes', "", 1, category],
		queryFn: () => category ? fetchNotesByCategory({currentPage: 1, searchText: "", noteTag: category}) : fetchNotes({currentPage: 1, searchText: "" }),
	})

  return (
		<HydrationBoundary state={dehydrate(queryClient)}>
			<NotesClient tag={category} />
		</HydrationBoundary>
  )
}