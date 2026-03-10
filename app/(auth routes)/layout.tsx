// import css from "./layout.module.css"

type Props = {
  children: React.ReactNode;
};

export default function AuthLayout({
	children
}: Props) {
	return <div>
		{children}
	</div>
}