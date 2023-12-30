import { FC } from "react";
import { SearchedArtist } from "../../../../types/index.ts";
import { Card, CardMedia, Grid } from "@mui/material";

type Props = {
  artist: SearchedArtist;
  //   chooseArtist: (track: Partial<SpotifyResponse>) => void;
};

const ArtistCard: FC<Props> = ({ artist }) => {
  return (
    <Grid item xs={4}>
      <Card>
        <CardMedia
          component="img"
          sx={{
            width: "100px",
            height: "100px",
            m: "5px",
            borderRadius: "10px",
          }}
          image={artist.id}
          alt={`${artist.name} Album`}
          loading="lazy"
        />
        {artist.name}
      </Card>
    </Grid>
  );
};

export { ArtistCard };
