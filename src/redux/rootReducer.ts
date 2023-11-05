import { AnyAction, combineReducers, ThunkDispatch } from '@reduxjs/toolkit';
import authSlice from "./slices/authSlice.ts";
import userSlice from "./slices/userSlice.ts";

export const rootReducer = combineReducers({
    auth: authSlice,
    user: userSlice,
});

export type RootState = ReturnType<typeof rootReducer>
export type AppThunkDispatch = ThunkDispatch<RootState, "", AnyAction>;



