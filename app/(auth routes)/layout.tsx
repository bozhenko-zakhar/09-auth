type Props = {
  children: React.ReactNode;
  // sidebar: React.ReactNode;
};

const AuthLayout = ({ children/*, sidebar*/ }: Props) => {
  return (
    <section style={{backgroundColor: "aqua"}}>
			{children}
    </section>
  );
};

export default AuthLayout;
