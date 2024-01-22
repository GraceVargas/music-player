import { FC, ReactNode } from "react";
import { Footer } from "../Footer";
import { Header } from "../Header";
import { Main } from "../Main";
import { Navbar } from "../Navbar";

type Props = {
  children: ReactNode;
  hideHeader?: boolean;
  hideNav?: boolean;
  hideFooter?: boolean;
  page?: string;
};

const Layout: FC<Props> = ({
  children,
  hideNav,
  hideHeader,
  hideFooter,
  page,
}) => {
  return (
    <>
      {!hideHeader && <Header>{!hideNav && <Navbar />}</Header>}
      <Main className={`page page-${page} py-5`}>{children}</Main>
      {!hideFooter && <Footer />}
    </>
  );
};

export { Layout };
