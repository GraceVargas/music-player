import React, { useContext, useEffect } from "react";
import { Layout } from "../../components/index.ts";
import { useArtists } from "../../hooks/index.ts";
import { useSelector } from "react-redux";
import { authSelector } from "../../redux/slices/authSlice.ts";
import { useParams } from "react-router-dom";
import { ArtistsContext } from "../../context/Artists/index.tsx";
import { Container, List, ListItem, Typography } from "@mui/material";

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
          <Container key={artist.id} sx={{ display: "flex", height: "50vh" }}>
            <div className="artistImg_container">
              <img src={artist.image} alt={`${artist.name}_img`} />
            </div>
            <div className="artistDetail_container">
              <Typography variant="h2">{artist.name}</Typography>
              <Typography variant="body1">
                {artist.followers.toLocaleString("es-ES")} Followers
              </Typography>
              <Typography variant="body1">
                Genres:
                <List>
                  {artist.genres.map((genre) => (
                    <ListItem>{genre}</ListItem>
                  ))}
                </List>
              </Typography>
            </div>
          </Container>
        )}
      </Layout>
    </>
  );
};

export { ArtistPage };
