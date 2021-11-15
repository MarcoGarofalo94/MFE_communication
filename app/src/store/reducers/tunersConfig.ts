import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: TunersConfigState = {
  changed: {} as TunersConfigChangedState,
  isLoading: false,
  config: Object() as TunersConfig,
  error: null,
};

const tunersConfigSlice = createSlice({
  initialState,
  name: "tunersConfig",
  reducers: {
    setTunersConfigChanged: (state, {payload}: PayloadAction<[string, TunerConfig]>) => {
      state.changed[payload[0]] = payload[1];
    },
    unsetTunersConfigChanged: (state, {payload}: PayloadAction<string>) => {
      state.changed[payload] = false;
    },
    resetTunersConfigChanged: (state) => {
      state.changed = {} as TunersConfigChangedState;
    },
    tunersRequestStart: (state) => {
      state.error = null;
      state.isLoading = true;
    },
    tunersRequestFail: (state, {payload}: PayloadAction<TeracueError | null>) => {
      state.error = payload;
      state.isLoading = false;
    },
    tunersRequestSuccess: (state, {payload}: PayloadAction<TunersConfig>) => {
      state.config = {...payload};
      state.isLoading = false;
    }
  },
});

export const {tunersRequestFail,tunersRequestStart,tunersRequestSuccess,
  setTunersConfigChanged,unsetTunersConfigChanged,resetTunersConfigChanged} = tunersConfigSlice.actions;
export default tunersConfigSlice.reducer;
