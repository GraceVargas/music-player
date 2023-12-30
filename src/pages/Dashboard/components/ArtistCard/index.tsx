import { FC } from "react";
import { SearchedArtist } from "../../../../types/index.ts";
import { Card, CardContent, CardMedia, Typography } from "@mui/material";

type Props = {
  artist: SearchedArtist;
  //   chooseArtist: (track: Partial<SpotifyResponse>) => void;
};

const ArtistCard: FC<Props> = ({ artist }) => {
  return (
    <Card
      sx={{
        textAlign: "center",
        height: "200px",
        width: "150px",
        borderRadius: "10px",
        cursor: "pointer",
        m: "5px",
      }}
    >
      <CardMedia
        component="img"
        sx={{
          width: "100px",
          height: "100px",
          marginY: "5px",
          marginX: "auto",
          borderRadius: "10px",
        }}
        image={artist.image}
        alt={`${artist.name} Album`}
        loading="lazy"
      />
      <CardContent>
        <Typography gutterBottom variant="body1" component="div">
          {artist.name}
        </Typography>
        <Typography gutterBottom variant="body2" component="div">
          {artist.genres}
        </Typography>
      </CardContent>
    </Card>
  );
};

export { ArtistCard };
