import SpotifyWebApi from "spotify-web-api-node";
import Global from "../../server/Global/Global.js";
import { mapToArray } from "./index.ts";
import { SpotifyResponse, SpotifyResponseArtist } from "../types/index.ts";

const createSpotifyApi = (accessToken: string) => {
  const spotifyApi = new SpotifyWebApi({
    clientId: Global.client_id,
    accessToken,
  });
  return spotifyApi;
};

// Sarch tracks
const searchTracks = async (
  search: string,
  accessToken: string
): Promise<SpotifyResponse[]> => {
  const spotifyApi = createSpotifyApi(accessToken);
  try {
    const response = await spotifyApi.searchTracks(search);
    return mapToArray(response.body.tracks?.items);
  } catch (error) {
    throw new Error("No se pudo realizar la request");
  }
};

// Search artists
const searchArtists = async (
  search: string,
  accessToken: string
): Promise<SpotifyResponseArtist[]> => {
  const spotifyApi = createSpotifyApi(accessToken);
  try {
    const response = await spotifyApi.searchArtists(search);
    return mapToArray(response.body.artists?.items);
  } catch (error) {
    throw new Error("No se pudo realizar la request");
  }
};

// Search playlists
const searchPlaylists = async (
  search: string,
  accessToken: string
): Promise<SpotifyResponse[] | undefined> => {
  const spotifyApi = createSpotifyApi(accessToken);
  try {
    const response = await spotifyApi.searchPlaylists(search);
    console.log("Search playlists", response.body);
    return mapToArray(response.body);
  } catch (error) {
    console.error(error);
  }
};

// Get an artist
const getArtist = async (
  artistId: string | undefined,
  accessToken: string
): Promise<SpotifyResponse[] | undefined> => {
  const spotifyApi = createSpotifyApi(accessToken);
  try {
    if (artistId) {
      const response = await spotifyApi.getArtist(artistId);
      console.log("Artist information", response.body);
      return mapToArray(response.body);
    }
  } catch (error) {
    console.error(error);
  }
};

// Get album
const getAlbum = async (
  albumUri: string | undefined,
  accessToken: string
): Promise<SpotifyResponse[] | undefined> => {
  const spotifyApi = createSpotifyApi(accessToken);
  try {
    if (albumUri) {
      const response = await spotifyApi.getAlbum(albumUri);
      return mapToArray(response.body);
    }
  } catch (error) {
    console.error(error);
  }
};

// Get tracks in an album
const getTracksInAlbum = async (
  albumUri: string,
  accessToken: string
): Promise<SpotifyResponse[] | undefined> => {
  const spotifyApi = createSpotifyApi(accessToken);
  try {
    const response = await spotifyApi.getAlbumTracks(albumUri, {
      limit: 15,
      offset: 1,
    });
    console.log("ALBUM Tracks", response.body);
    return mapToArray(response.body);
  } catch (error) {
    console.error(error);
  }
};

// Get albums by a certain artist
const getAlbumsByArtist = async (
  artistId: string | undefined,
  accessToken: string
): Promise<SpotifyResponse[] | undefined> => {
  const spotifyApi = createSpotifyApi(accessToken);
  try {
    if (artistId) {
      const response = await spotifyApi.getArtistAlbums(artistId);
      console.log("Artist albums", response.body);
      return mapToArray(response.body);
    }
  } catch (error) {
    console.error(error);
  }
};

//  Retrieve featured playlists
const getFeaturedPlaylists = async (accessToken: string) => {
  const spotifyApi = createSpotifyApi(accessToken);
  spotifyApi
    .getFeaturedPlaylists({
      limit: 3,
      offset: 1,
      country: "SE",
      locale: "sv_SE",
      timestamp: "2014-10-23T09:00:00",
    })
    .then(
      function (response) {
        return mapToArray(response.body);
      },
      function (err) {
        console.log("Something went wrong!", err);
      }
    );
};

export const tracksApi = {
  searchTracks,
  getFeaturedPlaylists,
  getAlbum,
  getTracksInAlbum,
  getArtist,
  getAlbumsByArtist,
  searchArtists,
  searchPlaylists,
};
