import React, { useContext, useEffect } from "react";
import { Layout } from "../../components/index.ts";
import { useArtists } from "../../hooks/index.ts";
import { useSelector } from "react-redux";
import { authSelector } from "../../redux/slices/authSlice.ts";
import { useParams } from "react-router-dom";
import { ArtistsContext } from "../../context/Artists/index.tsx";
import {
  Container,
  Grid,
  List,
  ListItem,
  Typography,
  Card,
} from "@mui/material";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { AlbumCard } from "./components/index.ts";

const ArtistPage = () => {
  const { id } = useParams();
  const { accessToken } = useSelector(authSelector);
  const { loadArtist, artist } = useContext(ArtistsContext);
  const { getArtistDetail } = useArtists();

  useEffect(() => {
    id && getArtistDetail(id).then((artist) => loadArtist(artist));
  }, [accessToken]);

  return (
    <>
      <Layout hideFooter hideHeader hideNav page="artistPage">
        {artist && (
          <>
            <Container sx={{ display: "flex", height: "50vh" }}>
              <div className="artistImg_container">
                <img src={artist.image} alt={`${artist.name}_img`} />
              </div>
              <div className="artistDetail_container">
                <Typography variant="h2">{artist.name}</Typography>
                <Typography variant="h5">
                  {artist.followers.toLocaleString("es-ES")} Followers
                </Typography>
                <Typography variant="body1">Genres:</Typography>
                <List>
                  {artist.genres.map((genre) => (
                    <ListItem key={genre} dense disablePadding>
                      <KeyboardArrowRightIcon />
                      {genre}
                    </ListItem>
                  ))}
                </List>
              </div>
            </Container>
            <Container>
              {artist.albums && (
                <Grid
                  container
                  spacing={4}
                  margin={0}
                  sx={{ alignContent: "center", justifyContent: "center" }}
                >
                  {artist.albums.map((album) => (
                    <AlbumCard album={album} key={album.id} />
                  ))}
                </Grid>
              )}
            </Container>
          </>
        )}
      </Layout>
    </>
  );
};

export { ArtistPage };
