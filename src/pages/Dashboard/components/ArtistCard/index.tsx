import { FC } from "react";
import { SearchedArtist } from "../../../../types/index.ts";
import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

type Props = {
  artist: SearchedArtist;
};

const ArtistCard: FC<Props> = ({ artist }) => {
  const navigate = useNavigate();
  const handleClick = (artistId: string) => {
    navigate(`/ArtistPage/${artistId}`, { replace: true });
  };
  return (
    <Card
      className="card"
      key={artist.id}
      sx={{
        position: "relative",
        textAlign: "center",
        height: "270px",
        width: "180px",
        borderRadius: "10px",
        cursor: "pointer",
        m: "5px",
      }}
      onClick={() => handleClick(artist.id)}
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
        image={artist.image}
        alt={`${artist.name} Album`}
        loading="lazy"
      />
      <CardContent sx={{ p: "5px" }}>
        <Typography
          gutterBottom
          variant="body1"
          component="div"
          sx={{ lineHeight: 1.3 }}
        >
          {artist.name}
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
            lineHeight: 1,
            color: "#ebebeb",
          }}
        >
          {artist.genres}
        </Typography>
      </CardContent>
    </Card>
  );
};

export { ArtistCard };
