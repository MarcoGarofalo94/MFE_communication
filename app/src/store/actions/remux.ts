import Axios, { REMUX_CONFIGURATION, PROGRAM } from "@config/axios";
import {
  remuxRequestFail,
  remuxRequestStart,
  remuxRequestSuccess,
} from "@store-app/reducers/remux";
import { AppThunk } from "@store-app/store";

export const fetchRemuxProgram = (): AppThunk => {
  return async (dispatch) => {
    dispatch(remuxRequestStart());
    try {
      const response = await Axios.get<TeracueRemuxSuccess>(
        REMUX_CONFIGURATION
      );
      const remux = { ...response.data.result };
      const remuxTunerList = {} as RemuxTuners;
      for (let i = 1; i <= 8; i++) {
        remuxTunerList["tuner" + i] = remux["tuner" + i];
      }
      remux.tuners = remuxTunerList;
      if (!response.data.success) {
        throw {
          code: 500,
          message: response.data.message,
        };
      }
      dispatch(remuxRequestSuccess(remux));
    } catch (error) {
      dispatch(
        remuxRequestFail({
          code: error.code,
          message: error.message,
        })
      );
    }
  };
};

export const setRemuxConfig = (
  remux: Remux,
  tuner: string,
  index: number
): AppThunk => {
  return async (
    dispatch
  ) => {
    dispatch(remuxRequestStart());
   
    let newRemux: Remux = JSON.parse(JSON.stringify({ ...remux }));
    console.log(remux);

    try {

      newRemux.tuners[tuner][index].pchecked =
        !newRemux.tuners[tuner][index].pchecked;
      const body = {
        [tuner]: newRemux.tuners[tuner],
      };
      let form = new FormData();
      form.append("config", JSON.stringify(body));
      const response = await Axios.post(
        PROGRAM,
        form,
        {
          headers: {
            "Content-Type": "text/plain",
          },
        }
      );
      console.log(response);
      if (!response.data.success) {
        throw {
          code: 500,
          message: response.data.message,
        };
      }

      dispatch(remuxRequestSuccess({ ...newRemux }));
    } catch (error) {
      console.log(error);
      dispatch(
        remuxRequestFail({
          code: error.code,
          message: error.message,
        })
      );
    }
  };
};
