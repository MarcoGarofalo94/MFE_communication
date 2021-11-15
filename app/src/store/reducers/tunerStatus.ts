import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: TunersStatusState = {
  isLoading: false,
  tuners: Object() as TunersStatus,
  error: null,
};

const tunersStatusSlice = createSlice({
  initialState,
  name: "tunersStatus",
  reducers: {
    resetTunersStatus: (state) => {
      state.tuners = Object() as TunersStatus;
      state.isLoading = false;
      state.error = null;
    },
    fetchTunersStatusStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    fetchTunersStatusFail: (
      state,
      { payload }: PayloadAction<TeracueError | null>
    ) => {
      state.error = payload;
      state.isLoading = false;
    },
    fetchTunersStatusSuccess: (
      state,
      { payload }: PayloadAction<TunersStatus>
    ) => {
      state.tuners = {...payload};
      state.isLoading = false;
    },
  },
});

export const {
  fetchTunersStatusFail,
  fetchTunersStatusStart,
  fetchTunersStatusSuccess,
  resetTunersStatus
} = tunersStatusSlice.actions;

export default tunersStatusSlice.reducer;
