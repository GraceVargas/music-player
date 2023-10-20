import { combineReducers } from '@reduxjs/toolkit';
import authSlice from "./slices/authSlice.ts";
import userSlice from "./slices/userSlice.ts";

export const rootReducer = combineReducers({
    user: userSlice,
    auth: authSlice,
});

export type RootState = ReturnType<typeof rootReducer>


