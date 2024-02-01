import React from "react";
import { FC, ReactNode, createContext, useState } from "react";
import { ArtistDetail, SearchedArtist } from "../../types/index.ts";

type ArtistsContextType = {
  artists: SearchedArtist[] | undefined;
  artist: ArtistDetail | undefined;
  loadArtists: (artist: SearchedArtist[]) => void;
  loadArtist: (artist: ArtistDetail | undefined) => void;
};

const artistInitialState = {
  id: "",
  name: "",
  image: "",
  followers: 0,
  genres: "",
  albums: [
    {
      id: "",
      name: "",
      tracks: 0,
      image: "",
      releaseDate: "",
    },
  ],
};

const ArtistsContext = createContext<ArtistsContextType>({
  artists: [],
  artist: artistInitialState,
  loadArtists: () => {},
  loadArtist: () => {},
});

type Props = {
  children: ReactNode;
};

const ArtistsProvider: FC<Props> = ({ children }) => {
  const [artists, setArtists] = useState<SearchedArtist[]>();
  const [artist, setArtist] = useState<ArtistDetail>();
  const loadArtists = (artists: SearchedArtist[]) => {
    setArtists(artists);
  };
  const loadArtist = (artist: ArtistDetail | undefined) => {
    setArtist(artist);
  };
  return (
    <ArtistsContext.Provider
      value={{ artists, loadArtists, loadArtist, artist }}
    >
      {children}
    </ArtistsContext.Provider>
  );
};

export { ArtistsContext, ArtistsProvider };
