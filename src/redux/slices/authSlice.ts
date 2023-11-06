import { createSlice, PayloadAction, createAsyncThunk, AnyAction } from "@reduxjs/toolkit";
import SpotifyWebApi from "spotify-web-api-node";
import { RootState } from "../rootReducer.ts";
import Global from "../../../server/Global/Global.ts";
import { AnyAsyncThunk } from "@reduxjs/toolkit/dist/matchers.js";

const spotifyApi = new SpotifyWebApi({
    clientId: Global.client_id,
  });

interface AuthState {
    accessToken: string;
    refreshToken: string;
    expiresIn: number;
}

const initialState: AuthState = {
    accessToken: "",
    refreshToken: "",
    expiresIn: 0,
};

export const configureAccessToken = createAsyncThunk<void, string, AnyAsyncThunk>(
    'auth/configureAccessToken',
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async (accessToken, { dispatch }) => {
      spotifyApi.setAccessToken(accessToken);
    }
  );


const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setAuthTokens: (state, action: PayloadAction<{ accessToken: string, refreshToken: string, expiresIn: number }>) => {
            state.accessToken = action.payload.accessToken;
            state.refreshToken = action.payload.refreshToken;
            state.expiresIn = action.payload.expiresIn;
        },
        clearAuthTokens: (state) => {
            state.accessToken = "";
            state.refreshToken = "";
            state.expiresIn = 0;
        },
    },
});

export const authSelector = (state: RootState) => state.auth;

export const { setAuthTokens, clearAuthTokens } = authSlice.actions;

export default authSlice.reducer;
