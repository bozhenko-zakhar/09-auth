"use client"

import { useRouter } from "next/navigation";
import css from "./page.module.css"
import { useState } from "react";
import { login, LoginRequest } from "@/lib/api/clientApi";
import { useAuthStore } from "@/lib/store/authStore";

const SignIn = () => {
  const router = useRouter();
  const [error, setError] = useState('');

  const setUser = useAuthStore((state) => state.setUser)

  const handleSubmit = async (formData: FormData) => {
    try {
	    // Типізуємо дані форми
      const formValues = Object.fromEntries(formData) as LoginRequest;
      // Виконуємо запит
      const res = await login(formValues);
      // Виконуємо редірект або відображаємо помилку
      if (res) {
				setUser(res)
        router.push('/profile');
      } else {
        setError('Invalid email or password');
      }
    } catch (error) {
      setError(
        error.response?.data?.error ?? // (error as ApiError)
          error.message ?? // (error as ApiError)
          'Oops... some error'
      )
    }
  };

	return (
		<main className={css.mainContent}>
		<form action={handleSubmit} className={css.form}>
				<h1 className={css.formTitle}>Sign in</h1>

				<div className={css.formGroup}>
					<label htmlFor="email">Email</label>
					<input id="email" type="email" name="email" className={css.input} required />
				</div>

				<div className={css.formGroup}>
					<label htmlFor="password">Password</label>
					<input id="password" type="password" name="password" className={css.input} required />
				</div>

				<div className={css.actions}>
					<button type="submit" className={css.submitButton}>
						Log in
					</button>
				</div>

				<p className={css.error}>{error}</p>
			</form>
		</main>
	)
};

export default SignIn;
