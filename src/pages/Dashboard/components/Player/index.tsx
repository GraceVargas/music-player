import SpotifyPlayer from "react-spotify-web-playback";
import { FC, useEffect, useState } from "react";
import { SearchedResult } from "../../../../types/index.ts";
import { useSelector } from "react-redux";
import { RootState } from "../../../../redux/rootReducer.ts";

type Props = {
  trackUri: SearchedResult | undefined;
};

const Player: FC<Props> = ({ trackUri }) => {
  const accessToken = useSelector((state: RootState) => state.auth.accessToken);

  const [play, setPlay] = useState(false);

  useEffect(() => setPlay(true), [trackUri?.uri]);

  if (!accessToken) return null;
  return (
    <SpotifyPlayer
      token={accessToken}
      uris={trackUri ? [trackUri.uri] : []}
      showSaveIcon
      play={play}
      styles={{
        bgColor: "#1e1e1e",
        color: "#ebebeb",
        sliderColor: "#42a5f5",
        sliderHandleColor: "#ebebeb",
        sliderTrackColor: "#c7c7c7",
        trackNameColor: "#ebebeb",
        trackArtistColor: "#e1e1e1",
        activeColor: "#42a5f5",
      }}
    />
  );
};

export { Player };
