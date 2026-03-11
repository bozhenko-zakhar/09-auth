"use client"

import { useRouter } from "next/navigation";
import { startTransition, useEffect, useState } from "react";

// import css from "./layout.module.css"

type Props = {
  children: React.ReactNode;
};

export default function AuthLayout({
	children
}: Props) {
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // 1. Примусово оновлюємо серверні дані
    router.refresh();

    // 2. Безпечно оновлюємо стан loading
    startTransition(() => {
      setLoading(false);
    });
  }, [router]);

	return <>{loading ? <div>Loading...</div> : children}</>;
}