// lib/api/serverApi.ts

import { cookies } from 'next/headers';
import { nextServer } from './api';
import { User } from '@/types/user';
import { Note } from '@/types/note';

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

export async function fetchNotes({currentPage, searchText}: FetchNotesParams): Promise<FetchNotesResponse> {
  const cookieStore = await cookies();

	const response = await nextServer.get<FetchNotesResponse>("/notes", {
		params: {
			search: searchText || "",
			page: currentPage,
			perPage: 12
		},
		headers: {
			Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`,
			Cookie: cookieStore.toString(),
		}
	});

	return response.data;
}
export async function fetchNoteById({currentId}: FetchNoteParams): Promise<Note> {
  const cookieStore = await cookies();

	const response = await nextServer.get<Note>(`/notes/${currentId}`, {
		headers: {
			Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`,
			Cookie: cookieStore.toString(),
		}
	});

	return response.data;
}

export const checkServerSession = async () => {
  // Дістаємо поточні cookie
  const cookieStore = await cookies();
  const res = await nextServer.get('/auth/session', {
    headers: {
      // передаємо кукі далі
      Cookie: cookieStore.toString(),
    },
  });
  // Повертаємо повний респонс, щоб proxy мав доступ до нових cookie
  return res;
};

export const getServerMe = async (): Promise<User> => {
  const cookieStore = await cookies();
  const { data } = await nextServer.get('/users/me', {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return data;
};