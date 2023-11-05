import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../rootReducer.ts";
import { authSelector } from './authSlice.ts';
import axios from "axios";
import { User } from "../../types/index.ts";


interface UserState {
    isLoading: boolean,
    isAuthenticated: boolean,
    userData: User,
}

const initialState: UserState = {
    isLoading: true,
    isAuthenticated: false,
    userData: {
        country: "",
        display_name: "",
        email: "",
        explicit_content: {
        filter_enabled: false,
        filter_locked: false
        },
        external_urls: {
        spotify: ""
        },
        followers: {
        href: "",
        total: 0
        },
        href: "",
        id: "",
        images: [
        {
            url: "",
            height: 0,
            width: 0
        }
        ],
        product: "",
        type: "",
        uri: ""
    }   
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

export const getCurrentUser = createAsyncThunk<User, void, { state: RootState }>('user/getCurrentUser',
    async (_, { getState }) => {
    const { accessToken, refreshToken } = authSelector(getState());

    if (!refreshToken || !accessToken) {
        return Promise.reject('No hay token de acceso');
    }

    try {
        const response = await axios.get('https://api.spotify.com/v1/me', {
        headers: {
            Authorization: `Bearer ${accessToken}`, 
            },
        });
        const userData: User = response.data;
        return userData;
        } catch (error) {
            console.error('Error al obtener información del usuario:', error);
            throw error;
        }
    }
);

export const userSelector = (state: RootState) => state.user;

export default userSlice.reducer;