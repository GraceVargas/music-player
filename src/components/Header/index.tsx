import { FC, ReactNode } from "react";

type Props = {
  children: ReactNode;
};

const Header: FC<Props> = ({ children }) => {
  return <header className="header">{children}</header>;
};

export { Header };
