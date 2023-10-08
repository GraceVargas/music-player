import { Stack, IconButton, InputBase, Grid, Box } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useState, useEffect, FC } from "react";
import SpotifyWebApi from "spotify-web-api-node";
import Global from "../../../../../server/Global/Global.ts";
import { TrackCard, Player } from "../index.ts";
import { SearchedResult } from "../../../../types/index.ts";
import { useTracks } from "../../../../hooks/index.ts";

const spotifyApi = new SpotifyWebApi({
  clientId: Global.client_id,
});

type Props = {
  accessToken: string; //borrar la props una vez que lo ponga en redux o context
};

const initialResult = [
  {
    artistName: "",
    title: "",
    uri: "",
    albumUrl: "",
  },
];

const FormSearch: FC<Props> = ({ accessToken }) => {
  const { getTracks } = useTracks();

  const [search, setSearch] = useState<string>("");
  const [searchedResults, setSearchedResults] =
    useState<SearchedResult[]>(initialResult);
  const [playTrack, setPlayTrack] = useState<SearchedResult>();

  const chooseTrack = (track: SearchedResult) => {
    setPlayTrack(track);
    setSearch("");
  };

  useEffect(() => {
    if (!accessToken) return;
    spotifyApi.setAccessToken(accessToken);
  }, [accessToken]);

  useEffect(() => {
    if (!search) return setSearchedResults([]);

    getTracks(search);
  }, [search, accessToken]);

  return (
    <>
      <Stack
        component="form"
        sx={{
          p: "2px 4px",
          m: "25px auto",
          display: "flex",
          flexDirection: "row",
          width: 800,
          backgroundColor: "#FFF",
          borderRadius: "15px",
          padding: "7px",
        }}
      >
        <InputBase
          sx={{
            ml: 1,
            flex: 1,
            color: "#000",
          }}
          placeholder="Search song or artist"
          inputProps={{ "aria-label": "search song or artist" }}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <IconButton
          type="button"
          sx={{ p: "2px", color: "#000" }}
          aria-label="search"
        >
          <SearchIcon />
        </IconButton>
      </Stack>

      <Grid container spacing={2}>
        {searchedResults.map((track) => (
          <TrackCard
            track={track}
            key={track.uri}
            chooseTrack={() => chooseTrack(track)}
          />
        ))}
      </Grid>
      <Box sx={{ position: "absolute", bottom: 0, left: 0, right: 0 }}>
        <Player
          accessToken={accessToken}
          trackUri={playTrack}
          key={playTrack?.uri}
        />
      </Box>
    </>
  );
};

export { FormSearch };
