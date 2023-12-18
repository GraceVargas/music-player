import React from "react";
import { FC, ReactNode, createContext, useState } from "react";
import { SpotifyResponse } from "../../types/index.ts";

type ArtistsContextType = {
  artists?: Partial<SpotifyResponse[]>;
  loadArtists: (artist: Partial<SpotifyResponse[]>) => void;
};

const ArtistsContext = createContext<ArtistsContextType>({
  artists: [],
  loadArtists: () => {},
});

type Props = {
  children: ReactNode;
};

const ArtistsProvider: FC<Props> = ({ children }) => {
  const [artists, setArtists] = useState<Partial<SpotifyResponse[]>>();
  const loadArtists = (artists: Partial<SpotifyResponse[]>) => {
    setArtists(artists);
  };
  return (
    <ArtistsContext.Provider value={{ artists, loadArtists }}>
      {children}
    </ArtistsContext.Provider>
  );
};

export { ArtistsContext, ArtistsProvider };
