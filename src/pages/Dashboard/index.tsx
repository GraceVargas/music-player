import React, { FC } from "react";
import { useArtists, useAuth } from "../../hooks";
import { Player, TrackCard, AsideMenu, ArtistCard } from "./components/index";
import {
  Container,
  Box,
  Stack,
  IconButton,
  InputBase,
  Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useTracks } from "../../hooks";
import { TracksContext } from "../../context/Tracks";
import { useContext, useEffect, useState } from "react";
import { SearchedTrack } from "../../types";
import { useSelector } from "react-redux";
import { getCurrentUser, userSelector } from "../../redux/slices/userSlice";
import { useDispatch } from "react-redux";
import { AppThunkDispatch } from "../../redux/rootReducer";
import { tracksApi } from "../../api";
import { ArtistsContext } from "../../context/Artists";
import { SimpleSlider } from "../../components/Slider";

type Props = {
  code: string;
};

const Dashboard: FC<Props> = ({ code }) => {
  const accessToken = useAuth(code);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const dispatch = useDispatch<AppThunkDispatch>();
  const [search, setSearch] = useState<string>("");
  const { userData } = useSelector(userSelector);
  const { getTracks } = useTracks();
  const { getArtists } = useArtists();
  const { tracks } = useContext(TracksContext);
  const { artists } = useContext(ArtistsContext);
  const [playTrack, setPlayTrack] = useState<SearchedTrack>();

  useEffect(() => {
    getTracks(search);
    getArtists(search);
    // tracksApi.searchPlaylists(search, accessToken);
  }, [search, accessToken]);

  useEffect(() => {
    dispatch(getCurrentUser());
  }, [accessToken, dispatch]);

  const chooseTrack = (track: SearchedTrack) => {
    setPlayTrack(track);
    tracksApi.getTracksInAlbum(track.albumId, accessToken);
    setSearch("");
  };

  return (
    <>
      <Container sx={{ display: "flex" }}>
        <AsideMenu />
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            width: "auto",
            minHeight: "100vh",
            marginTop: { xs: "80px", md: "10px" },
          }}
        >
          <Box>usuario: {userData.email}</Box>
          <Stack
            component="form"
            sx={{
              p: "2px 4px",
              m: "25px auto",
              display: "flex",
              flexDirection: "row",
              width: "100%",
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
          <Container>
            <Box sx={{ marginTop: "10px" }}>
              {tracks && (
                <>
                  <Typography variant="h5">Tracks</Typography>
                  <SimpleSlider
                    length={tracks.length}
                    children={tracks.map((track) => (
                      <TrackCard
                        track={track}
                        key={track.uri}
                        chooseTrack={() => chooseTrack(track)}
                      />
                    ))}
                  />
                </>
              )}
            </Box>
            <Box sx={{ marginTop: "10px" }}>
              {artists && (
                <>
                  <Typography variant="h5">Artists</Typography>
                  <SimpleSlider
                    length={artists.length}
                    children={
                      artists &&
                      artists.map((artist) => (
                        <ArtistCard artist={artist} key={artist.id} />
                      ))
                    }
                  />
                </>
              )}
            </Box>
          </Container>
        </Box>
      </Container>
      <Box sx={{ position: "sticky", bottom: 0, left: 0, right: 0 }}>
        <Player trackUri={playTrack} key={playTrack?.uri} />
      </Box>
    </>
  );
};

export { Dashboard };
