// import css from "./layout.module.css"

export default function RootLayout({
	children
}: Readonly<{
	children: React.ReactNode
}>) {
	return <div>
		{children}
	</div>
}
