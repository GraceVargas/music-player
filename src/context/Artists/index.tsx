import React from "react";
import { FC, ReactNode, createContext, useState } from "react";
import { SearchedArtist } from "../../types/index.ts";

type ArtistsContextType = {
  artists?: SearchedArtist[];
  loadArtists: (artist: SearchedArtist[]) => void;
};

const ArtistsContext = createContext<ArtistsContextType>({
  artists: [],
  loadArtists: () => {},
});

type Props = {
  children: ReactNode;
};

const ArtistsProvider: FC<Props> = ({ children }) => {
  const [artists, setArtists] = useState<SearchedArtist[]>();
  const loadArtists = (artists: SearchedArtist[]) => {
    setArtists(artists);
  };
  return (
    <ArtistsContext.Provider value={{ artists, loadArtists }}>
      {children}
    </ArtistsContext.Provider>
  );
};

export { ArtistsContext, ArtistsProvider };
