import { useContext } from "react";
import { TracksContext } from '../../context/Tracks/index.tsx';
import { tracksApi } from '../../api/index.tsx'
import { useSelector } from "react-redux";
import { authSelector } from "../../redux/slices/authSlice.ts";

const useTracks = () => {
    const { accessToken } = useSelector(authSelector);
    const { loadTracks } = useContext(TracksContext);


    const getTracks = async (search: string) => {
        try {
            const res = await tracksApi.searchTracks(search, accessToken);      
            if (res) { 
                loadTracks(
                  res.map((track) => {
                    const returnSmallestAlbumImg = () => {
                      const length = track.album.images.length;
                      return track.album.images[length - 1];
                    };
                    return {
                      artistName: track.artists[0].name,
                      title: track.name,
                      uri: track.uri,
                      albumUrl: returnSmallestAlbumImg().url,
                      album: track.album.name
                    };
                  })
                );
              }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch(err: any) {
            throw new Error(err.toString())
        }
    }

    return { getTracks };
}


export { useTracks }