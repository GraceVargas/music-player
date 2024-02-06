import React, { FC } from "react";
import { AlbumDetail } from "../../../../types/index.ts";
import { Card, CardMedia, CardContent, Typography, Grid } from "@mui/material";
import { truncateString } from "../../../../utils/index.ts";

type Props = {
  album: AlbumDetail;
};

const AlbumCard: FC<Props> = ({ album }) => {
  return (
    <Grid
      sx={{
        width: "200px",
        height: "250px",
      }}
    >
      <Card
        sx={{
          width: "90%",
          margin: "8px",
          borderRadius: "10px",
          position: "relative",
          overflow: "hidden",
          transition: "transform 0.3s",
        }}
        className="card album_card"
      >
        <CardMedia
          width="60%"
          component="img"
          image={album.image}
          alt={album.name}
          sx={{ objectFit: "contain" }}
        />
        <CardContent
          sx={{
            height: "90px",
            position: "relative",
            padding: "10px",
          }}
        >
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ position: "absolute", top: "7%" }}
          >
            {truncateString(album.name)}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ position: "absolute", bottom: "5%" }}
          >
            {album.releaseDate}
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  );
};

export { AlbumCard };
