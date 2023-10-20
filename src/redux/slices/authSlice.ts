import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../rootReducer.ts";

interface AuthState {
    accessToken: string | null;
    refreshToken: string | null;
    expiresIn: number | null;
}

const initialState: AuthState = {
    accessToken: null,
    refreshToken: null,
    expiresIn: null,
};

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
            state.accessToken = null;
            state.refreshToken = null;
            state.expiresIn = null;
        },
    },
});

export const authSelector = (state: RootState) => state.auth;

export const { setAuthTokens, clearAuthTokens } = authSlice.actions;

export default authSlice.reducer;
