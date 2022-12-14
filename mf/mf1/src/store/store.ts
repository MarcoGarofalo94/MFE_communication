import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
//import reducer from '@store-settings/reducers/reducer

export const store = configureStore({
    reducer: {
     
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk = ThunkAction<void,RootState,unknown,Action>;
