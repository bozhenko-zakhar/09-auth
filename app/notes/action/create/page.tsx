import NoteForm from "@/components/NoteForm/NoteForm";
import css from "./page.module.css"
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create Note",
  description: "The page for creating a new note",
	openGraph: {
		title: "Create Note",
		description: "The page for creating a new note",
		url: "https://08-zustand-sigma-rosy.vercel.app/notes/action/create",
		images: [{
			alt: "NoteHub preview image",
			width: 1200,
			height: 630,
			url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg"
		}]
	}
};

const CreateNote = () => {
	

	return (
		<main className={css.main}>
			<div className={css.container}>
				<h1 className={css.title}>Create note</h1>
				<NoteForm />
			</div>
		</main>
	)
};

export default CreateNote;