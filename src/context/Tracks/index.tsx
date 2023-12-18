import { FC, ReactNode, createContext, useState } from "react";
import { SearchedTrack } from "../../types/index.ts";

type TracksContextType = {
  tracks?: SearchedTrack[];
  loadTracks: (track: SearchedTrack[]) => void;
};

const TracksContext = createContext<TracksContextType>({
  tracks: [],
  loadTracks: () => {},
});

type Props = {
  children: ReactNode;
};

const TracksProvider: FC<Props> = ({ children }) => {
  const [tracks, setTracks] = useState<SearchedTrack[]>();
  const loadTracks = (tracks: SearchedTrack[]) => {
    setTracks(tracks);
  };
  return (
    <TracksContext.Provider value={{ tracks, loadTracks }}>
      {children}
    </TracksContext.Provider>
  );
};

export { TracksContext, TracksProvider };
