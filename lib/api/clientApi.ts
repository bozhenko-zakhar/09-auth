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
	noteTag?: NoteTag
}

interface CreateNoteParams {
	title: string;
	content: string;
	tag: NoteTag
}

interface DeleteNoteParams {
	currentId: string
}

export type RegisterRequest = {
  email: string;
  password: string;
};

export type LoginRequest = {
  email: string;
  password: string;
};

type CheckSessionRequest = {
  success: boolean;
};

type updateUserProfileRequest = {
  username: string;
}

export async function fetchNotes({currentPage, searchText, noteTag}: FetchNotesParams): Promise<FetchNotesResponse> {
	const queryParams = !noteTag ? {
		search: searchText || "",
		page: currentPage,
		perPage: 12
	} : {
		search: searchText || "",
		tag: noteTag,
		page: currentPage,
		perPage: 12
	}

	const response = await nextServer.get<FetchNotesResponse>("/notes", {
		params: queryParams
	});

	return response.data;
}

export async function fetchNoteById({currentId}: FetchNoteParams): Promise<Note> {
	const response = await nextServer.get<Note>(`/notes/${currentId}`);

	return response.data;
}

export async function createNote({title, content, tag}: CreateNoteParams): Promise<Note> {
	const newNote: CreateNoteParams = {
		title: title,
		content: content ?? "",
		tag: tag
	}

	const response = await nextServer.post<Note>("/notes", newNote);

	return response.data
}

export async function deleteNote({currentId}: DeleteNoteParams): Promise<Note> {
	const response = await nextServer.delete<Note>(`/notes/${currentId}`);

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

export const checkSession = async (): Promise<boolean> => {
  const res = await nextServer.get<CheckSessionRequest>('/auth/session');
  return res.data.success;
};

export const getMe = async (): Promise<User> => {
  const { data } = await nextServer.get<User>('/users/me');
  return data;
};

export const updateUserProfile = async (userData: updateUserProfileRequest): Promise<User> => {
	const res = await nextServer.patch<User>('/users/me', userData);
	return res.data;
}