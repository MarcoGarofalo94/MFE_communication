import { createAction, createSlice, PayloadAction } from "@reduxjs/toolkit";
const initialState: RemuxState = {
  isLoading: false,
  error: null,
  remux: {} as Remux,
};

const remuxSlice = createSlice({
  initialState,
  name: "remux",
  reducers: {
    remuxRequestStart: (state) => {
      state.error = null;
      state.isLoading = true;
    },
    remuxRequestFail: (state, { payload }: PayloadAction<TeracueError | null>) => {
      state.isLoading = false;
      state.error = payload;
    },
    remuxRequestSuccess: (state, { payload }: PayloadAction<Remux>) => {
      state.isLoading = false;
      state.remux = {...payload};
    },
  },
});
//   switch (action.type) {
//     case FETCH_REMUX_START || SET_REMUX_START:
//       return { ...state, isLoading: true };
//     case FETCH_REMUX_FAIL || SET_REMUX_FAIL:
//       return { ...state, isLoading: false, error: action.error };
//     case FETCH_REMUX_SUCCESS || SET_REMUX_SUCCESS:
//       return { ...state, isLoading: false, remux: action.remux };
//     case SET_REMUX_SUCCESS:
//       return { ...state, isLoading: false, remux: action.remux };

//     default:
//       return state;
//   }
// };

export const {remuxRequestFail,remuxRequestStart,remuxRequestSuccess} = remuxSlice.actions

export default remuxSlice.reducer;
