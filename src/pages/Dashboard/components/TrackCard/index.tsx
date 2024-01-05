import { FC } from "react";
import {
  Card,
  Box,
  CardContent,
  Typography,
  CardMedia,
  Grid,
} from "@mui/material";
import { SearchedTrack } from "../../../../types/index.ts";

type Props = {
  track: SearchedTrack;
  chooseTrack: (track: SearchedTrack) => void;
};

const TrackCard: FC<Props> = ({ track, chooseTrack }) => {
  const handlePlay = () => {
    chooseTrack(track);
  };

  return (
    <Card
      sx={{
        position: "relative",
        textAlign: "center",
        height: "230px",
        width: "180px",
        borderRadius: "10px",
        cursor: "pointer",
        m: "5px",
      }}
      onClick={handlePlay}
    >
      <CardMedia
        component="img"
        sx={{
          width: "100px",
          height: "100px",
          marginY: "8px",
          marginX: "auto",
          borderRadius: "10px",
        }}
        image={track.albumUrl}
        alt={`${track.artistName} Album`}
        loading="lazy"
      />
      <CardContent sx={{ p: "5px" }}>
        <Typography
          gutterBottom
          variant="body1"
          component="div"
          sx={{ lineHeight: 1.3 }}
        >
          {track.title}
        </Typography>
        <Typography
          variant="body1"
          color="text.secondary"
          component="div"
          sx={{
            whiteSpace: "nowrap",
          }}
        >
          {track.artistName}
        </Typography>
        <Typography
          gutterBottom
          variant="subtitle2"
          component="div"
          sx={{
            position: "absolute",
            left: 0,
            right: 0,
            bottom: "5%",
            margin: "1px",
            lineHeight: 1,
            color: "#ebebeb",
          }}
        >
          {track.album}
        </Typography>
      </CardContent>
    </Card>
  );
};

export { TrackCard };
