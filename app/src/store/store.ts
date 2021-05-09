import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import optionsReducer from '@store-app/reducers/options';
//import reducer from '@store-settings/reducers/reducer

export const store = configureStore({
    reducer: {
      optionsData: optionsReducer
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk = ThunkAction<void,RootState,unknown,Action>;
