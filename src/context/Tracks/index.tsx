import { FC, ReactNode, createContext, useState } from "react";
import { SearchedResult } from "../../types/index.ts";

type TracksContextType = {
  tracks?: SearchedResult[];
  loadTracks: (track: SearchedResult[]) => void;
};

const TracksContext = createContext<TracksContextType>({
  tracks: [],
  loadTracks: () => {},
});

type Props = {
  children: ReactNode;
};

const TracksProvider: FC<Props> = ({ children }) => {
  const [tracks, setTracks] = useState<SearchedResult[]>();
  const loadTracks = (tracks: SearchedResult[]) => {
    setTracks(tracks);
  };
  return (
    <TracksContext.Provider value={{ tracks, loadTracks }}>
      {children}
    </TracksContext.Provider>
  );
};

export { TracksContext, TracksProvider };
