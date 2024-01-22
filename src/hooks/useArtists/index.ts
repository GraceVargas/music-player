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
          loadArtists(res.map((item) => {
            let genre; 
            const returnSmallestAlbumImg = () => {
                const length = item.images.length;
                return item.images[length - 1];
              };
              item.genres[0] !== undefined ? genre = `${item.genres[0]}` : genre = ""; 
            return {
                id: item.id,
                name: item.name,
                image: returnSmallestAlbumImg().url,
                followers: item.followers.total,
                genres: genre
            }
          }));
          }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch(err: any) {
        throw new Error(err.toString())
    }
}

// const getSelectedArtist = async (artistId: string) => {
//   try {
//     const res = await tracksApi.getArtist(artistId, accessToken);
//     if (res) {
//       return {

//       }
//     }
//   }
// }

  return { getArtists };
}

export { useArtists }