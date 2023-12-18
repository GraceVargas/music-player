import { useSelector } from "react-redux";
import { authSelector } from "../../redux/slices/authSlice.ts";
import { tracksApi } from "../../api/index.tsx";
import { useContext } from "react";
import { ArtistsContext } from "../../context/Artists/index.tsx"

const useArtists = () => {
    const { accessToken } = useSelector(authSelector);
    const { loadArtists } = useContext(ArtistsContext);

const getArtists = async (search: string) => {
    try {
        const res = await tracksApi.searchArtists(search, accessToken);      
        if (res) { 
          loadArtists(res);
          }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch(err: any) {
        throw new Error(err.toString())
    }
}

  return { getArtists };
}

export { useArtists }