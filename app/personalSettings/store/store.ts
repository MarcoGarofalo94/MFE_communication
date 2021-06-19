import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';

//import reducer from '@store-personal/reducers/reducer

export const store = configureStore({
    reducer: {
      //reducerName: reducer
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk = ThunkAction<void,RootState,unknown,Action>;
