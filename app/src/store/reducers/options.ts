import { OptionsError } from "./../types/options";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Option, OptionsState } from "@store-app/types/options";

const initialState: OptionsState = {
  error: null,
  isLoading: false,
  options: [] as Option[],
};

const optionsDataSlice = createSlice({
  initialState,
  name: "data",
  reducers: {
    fetchOptionsStart: (state) => {
      state.isLoading = true;
    },
    fetchOptionsFail: (state, { payload }: PayloadAction<OptionsError>) => {
      state.error = payload;
      state.isLoading = false;
    },
    fetchOptionsSuccess: (state, { payload }: PayloadAction<Option[]>) => {
      state.options = payload;
      state.isLoading = false;
    },
  },
});

export const {
  fetchOptionsFail,
  fetchOptionsStart,
  fetchOptionsSuccess,
} = optionsDataSlice.actions;

export default optionsDataSlice.reducer;
