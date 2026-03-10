import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import TanStackProvider from "../components/TanStackProvider/TanStackProvider";

const roboto = Roboto({
	subsets: ["latin"],
	weight: ["400", "700"],
	variable: "--font-roboto",
	display: "swap"
})

export const metadata: Metadata = {
  title: "NoteHub",
  description: "An application for making the notes which allow making CRUD principles with them",
	openGraph: {
		title: "NoteHub",
		description: "An application for making the notes based on CRUD principles",
		url: "https://08-zustand-sigma-rosy.vercel.app/",
		images: [{
			alt: "NoteHub preview image",
			width: "1200",
			height: "630",
			url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg"
		}]
	}
};

export default function RootLayout({
  children,
	modal
}: Readonly<{
  children: React.ReactNode;
	modal: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={roboto.variable}>
				<TanStackProvider>
					<Header />
					{children}
					{modal}
					<Footer />
				</TanStackProvider>
      </body>
    </html>
  );
}
