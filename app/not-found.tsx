import css from "./page.module.css";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Error 404",
  description: "This page doesn't exist currently",
	openGraph: {
		title: "Error 404",
		description: "This page doesn't exist currently",
		url: "https://08-zustand-sigma-rosy.vercel.app/",
		images: [{
			alt: "404 error preview image",
			width: 1200,
			height: 630,
			url: "https://raw.githubusercontent.com/tsparticles/404-templates/main/__screenshots/simple.png"
		}]
	}
};

const NotFound = () => {
	return (
		<>
			<h1 className={css.title}>404 - Page not found</h1>
			<p className={css.description}>Sorry, the page you are looking for does not exist.</p>
		</>
	)
}

export default NotFound;