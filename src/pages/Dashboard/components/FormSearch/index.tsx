import { Stack, IconButton, InputBase } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useState, useEffect, FC } from "react";
import SpotifyWebApi from "spotify-web-api-node";
import Global from "../../../../../server/Global/Global.ts";

const spotifyApi = new SpotifyWebApi({
  clientId: Global.client_id,
});

type Props = {
  accessToken: string; //borrar la props una vez que lo ponga en redux o context
};

type SearchedResult = {
  artistName: string;
  title: string;
  uri: string;
  albumUrl: string;
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
  const [search, setSearch] = useState<string>("");
  const [searchedResults, setSearchedResults] =
    useState<SearchedResult[]>(initialResult);

  useEffect(() => {
    if (!accessToken) return;
    spotifyApi.setAccessToken(accessToken);
  }, [accessToken]);

  useEffect(() => {
    if (!search) return setSearchedResults([]);

    spotifyApi.searchTracks(search).then((res) => {
      if (res.body.tracks) {
        setSearchedResults(
          res.body.tracks.items.map((track) => {
            const returnSmallestAlbumImg = () => {
              const length = track.album.images.length;
              return track.album.images[length - 1];
            };

            return {
              artistName: track.artists[0].name,
              title: track.name,
              uri: track.uri,
              albumUrl: returnSmallestAlbumImg().url,
            };
          })
        );
      }
    });
  }, [search, accessToken]);

  console.log(searchedResults);

  return (
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

      <div>{searchedResults && <div>searchedResults</div>}</div>
    </Stack>
  );
};

export { FormSearch };
