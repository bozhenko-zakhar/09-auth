"use client"

import { useId } from 'react'
// import * as Yup from "yup"
import css from './NoteForm.module.css'
// import {Formik, Form, Field, ErrorMessage, type FormikHelpers} from "formik"
import type { NewNote, Note, NoteTag } from '../../types/note'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createNote } from '../../lib/api/clientApi'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import { useDraftStore } from '@/lib/store/noteStore'

export default function NoteForm() {
	const fieldId = useId();
	const queryClient = useQueryClient();
	const router = useRouter();
	
	const { draft, setDraft, clearDraft } = useDraftStore();

	const createNoteMutation = useMutation({
		mutationFn: async (newNote: NewNote) => {
			const createdNote: Promise<Note> = createNote({
				title: newNote.title,
				content: newNote.content,
				tag: newNote.tag
			});
			return createdNote;
		},
		onSuccess: () => {
			clearDraft();
			queryClient.invalidateQueries({ queryKey: ['notes', "", 1, undefined] });
			router.push("/notes/filter/all");
		
			toast.success("Your note was successfuly created");
		},
		onError: (error) => {
			toast.error(`${error}`);
		}
	});

	// const NoteFormSchema = Yup.object().shape({
	// 	title: Yup.string()
	// 		.required("title is required")
	// 		.min(3)
	// 		.max(50),
	// 	content: Yup.string()
	// 		.max(500),
	// 	tag: Yup.string()
	// 		.required("tag is required")
	// 		.matches(/(Todo|Work|Personal|Meeting|Shopping)/)
	// })

	function handleChange(event: React.ChangeEvent<
		HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
	>) {
		setDraft({
			...draft,
			[event.target.name]: event.target.value
		})
	}

	function handleSubmit(formData: FormData) {
		const values = Object.fromEntries(formData);
		createNoteMutation.mutate({
			title: values.title as string,
			content: values.content as string,
			tag: values.tag as NoteTag
		});

		
	}

  return (
		<form className={css.form} action={handleSubmit}>
			<div className={css.formGroup}>
				<label htmlFor={`${fieldId}-title`}>Title</label>
				<input
					onChange={handleChange}
					className={css.input}
					defaultValue={draft.title}
					type="text"
					name="title"
					id={`${fieldId}-title`}
				/>
				
				{/* <ErrorMessage name="title" component="span" className={css.error} /> */}
			</div>

			<div className={css.formGroup}>
				<label htmlFor={`${fieldId}-content`}>Content</label>
				<textarea
					onChange={handleChange}
					className={css.textarea}
					defaultValue={draft.content}
					id={`${fieldId}-content`}
					name="content"
					rows={8}
				/>
				{/* <ErrorMessage name="content" component="span" className={css.error} /> */}
			</div>

			<div className={css.formGroup}>
				<label htmlFor={`${fieldId}-tag`}>Tag</label>
				<select
				 	onChange={handleChange}
					className={css.select}
					defaultValue={draft.tag}
					id={`${fieldId}-tag`}
					name="tag"
				>
					<option value="Todo">Todo</option>
					<option value="Work">Work</option>
					<option value="Personal">Personal</option>
					<option value="Meeting">Meeting</option>
					<option value="Shopping">Shopping</option>
				</select>
				{/* <ErrorMessage name="tag" component="span" className={css.error} /> */}
			</div>

			<div className={css.actions}>
				<button onClick={() => router.back()} type="button" className={css.cancelButton}>
					Cancel
				</button>
				<button
					type="submit"
					className={css.submitButton}
					disabled={false}
				>
					Create note
				</button>
			</div>
		</form>
  )
}