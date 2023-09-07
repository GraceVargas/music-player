import { Container } from "@mui/material";
import { FC, ReactNode } from "react";

type Props = {
  children: ReactNode;
};

const Main: FC<Props> = ({ children }) => {
  return (
    <>
      <Container maxWidth="xl" sx={{ height: "80vh" }}>
        {children}
      </Container>
    </>
  );
};

export { Main };
