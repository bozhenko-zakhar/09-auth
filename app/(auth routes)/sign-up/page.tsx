"use client"

import { useRouter } from "next/navigation";
import css from "./page.module.css"
import { useState } from "react";
import { register, RegisterRequest } from "@/lib/api/clientApi";
import { useAuthStore } from "@/lib/store/authStore";
import { ApiError } from "@/app/api/api";

const SignUp = () => {
  const router = useRouter();
  const [error, setError] = useState('');
  const setUser = useAuthStore((state) => state.setUser)
	
  const handleSubmit = async (formData: FormData) => {
    try {
	    // Типізуємо дані форми
      const formValues = Object.fromEntries(formData) as RegisterRequest;
      // Виконуємо запит
      const res = await register(formValues);
			console.log(res)
      // Виконуємо редірект або відображаємо помилку
      if (res) {
				setUser(res);
        router.push('/profile');
      } else {
        setError('Invalid email or password');
      }
    } catch (error) {
      setError(
        (error as ApiError).response?.data?.error ?? // (error as ApiError)
          (error as ApiError).message ?? // (error as ApiError)
          'Oops... some error'
      )
    }
  };

	return (
		<main className={css.mainContent}>
			<h1 className={css.formTitle}>Sign up</h1>
			<form action={handleSubmit} className={css.form}>
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
						Register
					</button>
				</div>

				<p className={css.error}>{error}</p>
			</form>
		</main>
	)
};

export default SignUp;
