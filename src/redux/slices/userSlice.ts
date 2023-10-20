import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../rootReducer.ts";
import { authSelector } from './authSlice.ts';
import axios from "axios";


interface UserState {
    isLoading: boolean,
    isAuthenticated: boolean,
    userData: unknown,
}

const initialState: UserState = {
    isLoading: true,
    isAuthenticated: false,
    userData: ''
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
          .addCase(getCurrentUser.pending, (state) => {
            state.isLoading = true;
          })
          .addCase(getCurrentUser.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isAuthenticated = true;
            state.userData = action.payload;
          })
          .addCase(getCurrentUser.rejected, (state) => {
            state.isLoading = false;
            console.error('Error al obtener información del usuario');
          });
      },
})

export const getCurrentUser = createAsyncThunk('user/getCurrentUser',
    async (_, { getState }) => {
    const { accessToken, refreshToken } = authSelector(getState() as RootState);

    if (!refreshToken || !accessToken) {
        return null;
    }

    try {
        const response = await axios.get('https://api.spotify.com/v1/me', {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
        });
        return response;
        } catch (error) {
            console.error('Error al obtener información del usuario:', error);
            throw error;
        }
    }
);

export const userSelector = (state: RootState) => state.user;

export default userSlice.reducer;