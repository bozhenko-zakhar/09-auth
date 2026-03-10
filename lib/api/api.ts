import axios from "axios";

export const nextServer = axios.create({
  baseURL: "https://notehub-api.goit.study/",
  withCredentials: true, // дозволяє axios працювати з cookie
});



// axios.defaults.baseURL = "https://notehub-public.goit.study/api/notes"

