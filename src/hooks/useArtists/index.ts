/* eslint-disable @typescript-eslint/no-explicit-any */
import { useSelector } from "react-redux";
import { authSelector } from "../../redux/slices/authSlice.ts";
import { tracksApi } from "../../api/index.tsx";
import { useContext } from "react";
import { ArtistsContext } from "../../context/Artists/index.tsx";
import { ArtistDetail } from "../../types/index.ts";
import { formatDate } from "../../utils/index.ts";

const useArtists = () => {
  const { accessToken } = useSelector(authSelector);
  const { loadArtists } = useContext(ArtistsContext);

  const getArtists = async (search: string) => {
    try {
      const res = await tracksApi.searchArtists(search, accessToken);
      if (res) {
        loadArtists(
          res.map((item) => {
            let genre;
            const returnSmallestAlbumImg = () => {
              const length = item.images.length;
              return item.images[length - 1];
            };
            item.genres[0] !== undefined
              ? (genre = `${item.genres[0]}`)
              : (genre = "");
            return {
              id: item.uri.replace("spotify:artist:", ""),
              name: item.name,
              image: returnSmallestAlbumImg().url,
              followers: item.followers.total,
              genres: genre,
            };
          })
        );
      }
    } catch (err: any) {
      throw new Error(err.toString());
    }
  };

  const getArtistAlbums = async (artistId: string) => {
    try {
      const response = await tracksApi.getAlbumsByArtist(artistId, accessToken);
      if (response) {
        const temp = response.map((album) => {
          return {
            id: album.uri.replace("spotify:album:", ""),
            name: album.name,
            tracks: album.total_tracks,
            image: album.images[1].url,
            releaseDate: formatDate(album.release_date),
          };
        });
        return temp;
      }
    } catch (err: any) {
      throw new Error(err.toString());
    }
  };

  const getArtistDetail = async (
    artistId: string
  ): Promise<ArtistDetail | undefined> => {
    try {
      const res = await tracksApi.getArtist(artistId, accessToken);
      if (res) {
        // let genre;
        // res.genres[0] !== undefined
        //   ? (genre = `${res.genres[0]}`)
        //   : (genre = "");
        return {
          id: res.id,
          name: res.name,
          image: res.images[0].url,
          followers: res.followers.total,
          genres: res.genres,
          albums: await getArtistAlbums(artistId),
        };
      }
    } catch (err: any) {
      throw new Error(err.toString());
    }
  };

  return { getArtists, getArtistDetail, getArtistAlbums };
};

export { useArtists };
