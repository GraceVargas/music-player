import React, { FC, useEffect } from "react";
import { useAuth } from "../../hooks";
import { FormSearch } from "./components/index";
import { Container } from "@mui/material";
import SpotifyWebApi from "spotify-web-api-node";
import Global from "../../../server/Global/Global";

type Props = {
  code: string;
};

const spotifyApi = new SpotifyWebApi({
  clientId: Global.client_id,
});

const Dashboard: FC<Props> = ({ code }) => {
  const accessToken = useAuth(code);

  // const [searchedResults, setSearchedResults] = useState<string[]>([]);

  useEffect(() => {
    if (!accessToken) return;
    spotifyApi.setAccessToken(accessToken);
  }, [accessToken]);

  return <Container>{<FormSearch />}</Container>;
};

export { Dashboard };
