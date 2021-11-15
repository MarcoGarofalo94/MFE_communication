import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface PageState {
  error: Error | null | NCResponseError;
  isLoading: boolean;
  selectedPage: null | PageTypes;
}
const initialState: PageState = {
  error: null,
  isLoading: false,
  selectedPage: null,
};

const pageSlice = createSlice({
  initialState,
  name: "page",
  reducers: {
    setSelectedPage: (state, { payload }: PayloadAction<PageTypes>) => {
      state.selectedPage = payload;
    },
    requestStart: (state) => {
      state.error = null;
      state.isLoading = true;
    },
    requestFail: (
      state,
      { payload }: PayloadAction<Error | null | NCResponseError>
    ) => {
      state.error = payload;
      state.isLoading = false;
    },
    requestSuccess: (state, { payload }: PayloadAction) => {
      state.isLoading = false;
      console.log(payload);
    },
    resetError: (state) => {
      state.error = null;
    },
  },
});

export const {
  setSelectedPage,
  requestFail,
  requestStart,
  requestSuccess,
  resetError,
} = pageSlice.actions;

export default pageSlice.reducer;
