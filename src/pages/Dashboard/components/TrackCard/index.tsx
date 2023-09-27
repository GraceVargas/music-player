import { FC } from "react";
import {
  Card,
  Box,
  CardContent,
  Typography,
  CardMedia,
  Grid,
} from "@mui/material";
// crear archivo de types

type SearchedResult = {
  artistName: string;
  title: string;
  uri: string;
  albumUrl: string;
};

type Props = {
  track: SearchedResult;
};

const TrackCard: FC<Props> = ({ track }) => {
  return (
    <Grid item xs={4}>
      <Card sx={{ display: "flex" }}>
        <CardMedia
          component="img"
          sx={{ width: 100, height: 90, m: "5px" }}
          image={track.albumUrl}
          alt={`${track.artistName} Album`}
          loading="lazy"
        />
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <CardContent sx={{ flex: "1 0 auto" }}>
            <Typography component="div" variant="h5">
              {track.title}
            </Typography>
            <Typography variant="body1" color="text.secondary" component="div">
              {track.artistName}
            </Typography>
          </CardContent>
        </Box>
      </Card>
    </Grid>
  );
};

export { TrackCard };
