import React, { useContext, useEffect } from "react";
import { Layout } from "../../components/index.ts";
import { useArtists } from "../../hooks/index.ts";
import { useSelector } from "react-redux";
import { authSelector } from "../../redux/slices/authSlice.ts";
import { useParams } from "react-router-dom";
import { ArtistsContext } from "../../context/Artists/index.tsx";
import { Container, List, ListItem, Typography, Box } from "@mui/material";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { AlbumsGallery } from "./components/index.ts";

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
          <Container>
            <Box sx={{ display: "flex", height: "50vh" }}>
              <div className="artistImg_container">
                <img src={artist.image} alt={`${artist.name}_img`} />
              </div>
              <div className="artistDetail_container">
                <Typography variant="h2">
                  {artist.name.toUpperCase()}
                </Typography>
                <Typography variant="h5">
                  {artist.followers.toLocaleString("es-ES")} Followers
                </Typography>
                <List>
                  <Typography variant="body1">Genres:</Typography>
                  {artist.genres.map((genre) => (
                    <ListItem key={genre} dense disablePadding>
                      <KeyboardArrowRightIcon />
                      {genre}
                    </ListItem>
                  ))}
                </List>
              </div>
            </Box>
            <Box sx={{ position: "relative", height: "50vh" }}>
              {artist.albums && <AlbumsGallery albums={artist.albums} />}
            </Box>
          </Container>
        )}
      </Layout>
    </>
  );
};

export { ArtistPage };
