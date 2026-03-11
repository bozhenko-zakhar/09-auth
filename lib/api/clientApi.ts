import { nextServer } from "./api";
import type { Note, NoteTag } from "../../types/note";
import { User } from "@/types/user";

interface FetchNotesResponse {
	notes: Note[];
	totalPages: number
}

interface FetchNoteParams {
	currentId: string
}

interface FetchNotesParams {
	currentPage: number;
	searchText: string;
}

interface FetchNotesByCategoryParams {
	currentPage: number;
	searchText: string;
	noteTag: NoteTag
}

interface CreateNoteParams {
	title: string;
	content: string | null;
	tag: NoteTag
}

interface DeleteNoteParams {
	currentId: string
}

export type RegisterRequest = {
  email: string;
  password: string;
  username: string;
};

export type LoginRequest = {
  email: string;
  password: string;
};

type CheckSessionRequest = {
  success: boolean;
};

type updateUserProfileRequest = {
  email: string;
  username: string;
}

export async function fetchNotes({currentPage, searchText}: FetchNotesParams): Promise<FetchNotesResponse> {
	const response = await nextServer.get<FetchNotesResponse>("/notes", {
		params: {
			search: searchText || "",
			page: currentPage,
			perPage: 12
		},
		headers: {
			Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`
		}
	});

	return response.data;
}

export async function fetchNotesByCategory({currentPage, searchText, noteTag}: FetchNotesByCategoryParams): Promise<FetchNotesResponse> {
	const response = await nextServer.get<FetchNotesResponse>("/notes", {
		params: {
			search: searchText || "",
			tag: noteTag,
			page: currentPage,
			perPage: 12
		},
		headers: {
			Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`
		}
	});

	return response.data;
}

export async function fetchNoteById({currentId}: FetchNoteParams): Promise<Note> {
	const response = await nextServer.get<Note>(`/notes/${currentId}`, {
		headers: {
			Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`
		}
	});

	return response.data;
}

export async function createNote({title, content, tag}: CreateNoteParams): Promise<Note> {
	const newNoteL: CreateNoteParams = {
		title: title,
		content: content,
		tag: tag
	}

	const response = await nextServer.post<Note>("/notes", newNoteL, {
		headers: {
			Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`
		}
	});

	return response.data
}

export async function deleteNote({currentId}: DeleteNoteParams): Promise<Note> {
	const response = await nextServer.delete<Note>(`/notes/${currentId}`, {
		headers: {
			Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`
		}
	});

	return response.data
}

export const register = async (data: RegisterRequest): Promise<User> => {
  const res = await nextServer.post<User>('/auth/register', data);
  return res.data;
};

export const login = async (data: LoginRequest): Promise<User> => {
  const res = await nextServer.post<User>('/auth/login', data);
  return res.data;
};

export const logout = async (): Promise<void> => {
  await nextServer.post('/auth/logout');
	return;
}

export const checkSession = async (): Promise<CheckSessionRequest> => {
  const res = await nextServer.get<CheckSessionRequest>('/auth/session');
  return res.data;
};

export const getMe = async (): Promise<User> => {
  const { data } = await nextServer.get<User>('/users/me');
  return data;
};

export const updateUserProfile = async (newData: updateUserProfileRequest): Promise<User> => {
	const { data } = await nextServer.patch('/users/me', newData);
	return data;
}