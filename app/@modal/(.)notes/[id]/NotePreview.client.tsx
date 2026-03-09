"use client"

import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation"
import { fetchNoteById } from "@/lib/api";
import { useRouter } from "next/navigation";
import Modal from "@/components/Modal/Modal";
import css from "./page.module.css"

const NotePreviewClient = () => {
	const { id } = useParams<{id: string}>();
	const { data: note, isLoading, isFetched, isSuccess, error } = useQuery({
		queryKey: ['note', id],
		queryFn: () => fetchNoteById({currentId: id}),
		refetchOnMount: false
	});

	const router = useRouter();
	const close = () => router.back();

	return (
		<Modal closeModal={close}>
			<div className={css.container}>

				<div className={css.btn_container}>
					<button onClick={close} className={css.btn}>🠔</button>
					<button onClick={close} className={css.btn}>✕</button>
				</div>

				{ isFetched && isSuccess && (
				<div className={css.item}>
					<div className={css.header}>
						<h2>{note?.title}</h2>
					</div>
					<p className={css.tag}>{note?.tag}</p>
					<p className={css.content}>{note?.content}</p>
					<p className={css.date}>{note?.createdAt}</p>
				</div>
				)}
				
				{ isLoading && (
					<p>Loading, please wait...</p>
				)}

				{ error && (
					<p>Something went wrong.</p>
				)}
		</div>
		</Modal>
	)
}

export default NotePreviewClient;