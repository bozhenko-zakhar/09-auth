import Link from "next/link";
import Image from "next/image";
import css from "./page.module.css"
import { getServerMe } from "@/lib/api/serverApi";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "User Profile",
  description: "Page preview about whole profile information",
	openGraph: {
		title: "User Profile",
		description: "Page preview about whole profile information",
		url: "https://08-zustand-sigma-rosy.vercel.app/profile",
		images: [{
			alt: "NoteHub preview image",
			width: "1200",
			height: "630",
			url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg"
		}]
	}
};

const Profile = async () => {
	const user = await getServerMe();

	return (
		<main className={css.mainContent}>
			<div className={css.profileCard}>
				<div className={css.header}>
					<h1 className={css.formTitle}>Profile Page</h1>
					<Link href="/profile/edit" className={css.editProfileButton}>
						Edit Profile
					</Link>
				</div>
				<div className={css.avatarWrapper}>
					<Image
						src={user.avatar}
						alt={`User profile preview: ${user.avatar}`}
						width={120}
						height={120}
						className={css.avatar}
					/>
				</div>
				<div className={css.profileInfo}>
					<p>
						Username: {user.username}
					</p>
					<p>
						Email: {user.email}
					</p>
				</div>
			</div>
		</main>
	)
};

export default Profile;