import Link from "next/link";
// import Image from "next/image";
import css from "./page.module.css"

const Profile = () => {
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
					{/* <Image
						src={}
						alt="User Avatar"
						width={120}
						height={120}
						className={css.avatar}
					/> */}
				</div>
				<div className={css.profileInfo}>
					<p>
						Username: your_username
					</p>
					<p>
						Email: your_email@example.com
					</p>
				</div>
			</div>
		</main>
	)
};

export default Profile;