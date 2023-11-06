import SpotifyWebApi from "spotify-web-api-node";
import Global from "../../server/Global/Global.js";
import { mapToArray } from "./index.ts";
import { SpotifyResponse } from "../types/index.ts";

const createSpotifyApi = (accessToken: string) => {
  const spotifyApi = new SpotifyWebApi({
    clientId: Global.client_id,
    accessToken,
  });

  return spotifyApi;
};

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

export const tracksApi = { searchTracks };
