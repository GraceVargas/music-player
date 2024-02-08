import { Container } from "@mui/material";
import { FC, ReactNode } from "react";

type Props = {
  children: ReactNode;
};

const Main: FC<Props> = ({ children }) => {
  return (
    <>
      <Container>{children}</Container>
    </>
  );
};

export { Main };
