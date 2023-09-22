import React, { FC } from "react";
import { useAuth } from "../../hooks";
import { FormSearch } from "./components/index";
import { Container } from "@mui/material";

type Props = {
  code: string;
};

const Dashboard: FC<Props> = ({ code }) => {
  const { accessToken } = useAuth(code);

  return <Container>{<FormSearch />}</Container>;
};

export { Dashboard };
