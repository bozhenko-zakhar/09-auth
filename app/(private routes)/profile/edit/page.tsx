"use client"

import Image from "next/image";
import css from "./page.module.css"
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/lib/store/authStore";
import { getMe, updateUserProfile } from "@/lib/api/clientApi";

const EditProfile = () => {
	const router = useRouter();
	const user = useAuthStore((state) => state.user)
	const [userName, setUserName] = useState("");

	useEffect(() => {
    getMe().then((user) => {
      setUserName(user.username ?? '');
    });
  }, [setUserName]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserName(event.target.value);
  };

  const handleSaveUser = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await updateUserProfile({ username: userName });
    } catch (error) {
      console.error('Oops, some error:', error);
    }
  };

	return (
		<main className={css.mainContent}>
			<div className={css.profileCard}>
				<h1 className={css.formTitle}>Edit Profile</h1>

				<Image
					src={user?.avatar ?? "/avatar.placeholder.png"}
					alt={`User profile preview: ${user?.avatar}`}
					width={120}
					height={120}
					className={css.avatar}
				/>

				<form onSubmit={handleSaveUser} className={css.profileInfo}>
					<div className={css.usernameWrapper}>
						<label htmlFor="username">Username:</label>
						<input
							onChange={handleChange}
							id="username"
							type="text"
							className={css.input}
						/>
					</div>

					<p>Email: {user?.email}</p>

					<div className={css.actions}>
						<button type="submit" className={css.saveButton}>
							Save
						</button>
						<button onClick={() => 	router.back()} type="button" className={css.cancelButton}>
							Cancel
						</button>
					</div>
				</form>
			</div>
		</main>
	)
};

export default EditProfile;
