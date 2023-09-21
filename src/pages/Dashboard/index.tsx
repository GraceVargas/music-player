import React, { FC } from "react";
import { useAuth } from "../../hooks";

type Props = {
  code: string;
};

const Dashboard: FC<Props> = ({ code }) => {
  const { accessToken } = useAuth(code);

  return <div>{accessToken}</div>;
};

export { Dashboard };
