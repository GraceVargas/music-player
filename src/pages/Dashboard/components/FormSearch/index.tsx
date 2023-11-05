import { Stack, IconButton, InputBase, Grid, Box } from "@mui/material";
// import SearchIcon from "@mui/icons-material/Search";
import { useState, useEffect } from "react";
import { TrackCard, Player } from "../index.ts";
import { SearchedResult } from "../../../../types/index.ts";
import { useSelector } from "react-redux";
import { AppThunkDispatch, RootState } from "../../../../redux/rootReducer.ts";
import { useDispatch } from "react-redux";
import SpotifyWebApi from "spotify-web-api-node";
import {
  userSelector,
  getCurrentUser,
} from "../../../../redux/slices/userSlice.ts";
import Global from "../../../../../server/Global/Global.ts";

const spotifyApi = new SpotifyWebApi({
  clientId: Global.client_id,
});

const initialResult = [
  {
    artistName: "",
    title: "",
    uri: "",
    albumUrl: "",
  },
];

const FormSearch = () => {
  const accessToken = useSelector((state: RootState) => state.auth);

  const dispatch = useDispatch<AppThunkDispatch>();

  useEffect(() => {
    dispatch(getCurrentUser());
  }, [accessToken, dispatch]);

  const { userData } = useSelector(userSelector);

  const [search, setSearch] = useState<string>("");
  const [searchedResults, setSearchedResults] =
    useState<SearchedResult[]>(initialResult);
  const [playTrack, setPlayTrack] = useState<SearchedResult>();

  const chooseTrack = (track: SearchedResult) => {
    setPlayTrack(track);
    setSearch("");
  };

  useEffect(() => {
    if (!search) return setSearchedResults([]);

    spotifyApi
      .searchTracks(search)
      .then((res) => {
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
      })
      .catch(Error);
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
          {/* <SearchIcon /> */}
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
        <Player trackUri={playTrack} key={playTrack?.uri} />
      </Box>

      <Box>usuario: {userData.email}</Box>
    </>
  );
};

export { FormSearch };
