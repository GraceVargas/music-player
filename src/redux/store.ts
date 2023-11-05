// store.ts
import { configureStore, AnyAction, Store } from '@reduxjs/toolkit';
import { AppThunkDispatch, RootState, rootReducer } from './rootReducer.ts';

export type AppStore = Omit<Store<RootState, AnyAction>, "dispatch"> & {
  dispatch: AppThunkDispatch;
};

const store: AppStore = configureStore({
  reducer: rootReducer,
});

export default store;