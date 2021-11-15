import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import pageReducer from './reducers/page';
//import reducer from '@store-settings/reducers/reducer

import remuxReducer from "./reducers/remux";
import tunersConfigReducer from "./reducers/tunersConfig";
import tunerStatusReducer from "./reducers/tunerStatus";

export const store = configureStore({
    reducer: {
        page: pageReducer,
        remux: remuxReducer,
        tunersConfig: tunersConfigReducer,
        tunerStatus: tunerStatusReducer,
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk = ThunkAction<void,RootState,unknown,Action>;
