import axios from "axios";

export const nextServer = axios.create({
  baseURL: "http://localhost:3000/api",
  withCredentials: true, // дозволяє axios працювати з cookie
});



// axios.defaults.baseURL = "https://notehub-public.goit.study/api/notes"

