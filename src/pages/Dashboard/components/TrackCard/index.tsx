import { FC } from "react";
import {
  Card,
  Box,
  CardContent,
  Typography,
  CardMedia,
  Grid,
} from "@mui/material";
import { SearchedResult } from "../../../../types/index.ts";

type Props = {
  track: SearchedResult;
  chooseTrack: (track: SearchedResult) => void;
};

const TrackCard: FC<Props> = ({ track, chooseTrack }) => {
  const handlePlay = () => {
    chooseTrack(track);
  };

  return (
    <Grid item xs={4}>
      <Card
        sx={{ display: "flex", borderRadius: "10px", cursor: "pointer" }}
        onClick={handlePlay}
      >
        <CardMedia
          component="img"
          sx={{
            width: "100px",
            height: "100px",
            m: "5px",
            borderRadius: "10px",
          }}
          image={track.albumUrl}
          alt={`${track.artistName} Album`}
          loading="lazy"
        />
        <Box sx={{ width: "100%", display: "flex", flexDirection: "column" }}>
          <CardContent sx={{ flex: "1 0 auto", position: "relative" }}>
            <Typography
              component="div"
              variant="h6"
              sx={{
                position: "absolute",
                top: "12%",
                width: "90%",
                textOverflow: "ellipsis",
                overflow: "hidden",
                whiteSpace: "nowrap",
              }}
            >
              {track.title}
            </Typography>
            <Typography
              variant="body1"
              color="text.secondary"
              component="div"
              sx={{
                position: "absolute",
                bottom: "35%",
                whiteSpace: "nowrap",
              }}
            >
              {track.artistName}
            </Typography>
          </CardContent>
        </Box>
      </Card>
    </Grid>
  );
};

export { TrackCard };
