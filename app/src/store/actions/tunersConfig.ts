import Axios, { TUNERS_CONFIGURATIONS } from "@config/axios";
import {
  tunersRequestFail,
  tunersRequestStart,
  tunersRequestSuccess,
  setTunersConfigChanged,
  unsetTunersConfigChanged,
  resetTunersConfigChanged
} from "@store-app/reducers/tunersConfig";
import { AppThunk } from "@store-app/store";
import {resetTunersStatus} from "@store-app/reducers/tunerStatus";

export const fetchTunersConfig = (): AppThunk => {
  return async (dispatch) => {
    dispatch(tunersRequestStart());
    try {
      const response = await Axios.get<TeracueTunerConfigSuccess>(
        TUNERS_CONFIGURATIONS
      );
      const tuners = { ...response.data.result };
      console.log(response);
      /* const TunersList = {} as Tuners;
      for (let i = 1; i <= 8; i++) {
        TunersList["tuner" + i] = remux["tuner" + i];
      }
      remux.tuners = remuxTunerList;
      if (!response.data.success) {
        throw {
          code: 500,
          message: response.data.message,
        };
      }*/

      dispatch(tunersRequestSuccess(tuners));
    } catch (error) {
      dispatch(
        tunersRequestFail({
          code: error.code,
          message: error.message,
        })
      );
    }
  };
};

export const setTunersConfig = (
  config: TunersConfig
): AppThunk => {
  return async (dispatch) => {
    dispatch(tunersRequestStart());

    try {
      let form = new FormData();
      form.append("config", JSON.stringify(config));
      const response = await Axios.post<TeracueTunerConfigSuccess>(
        TUNERS_CONFIGURATIONS,
        form,
        {
          headers: {
            "Content-Type": "text/plain",
          },
        }
      );
      if (!response.data.success) {
        throw {
          code: 500,
          message: response.data.message,
        };
      }

      dispatch(tunersRequestSuccess({...config}));
    } catch (error) {
      console.log(error);
      dispatch(
        tunersRequestFail({
          code: error.code,
          message: error.message,
        })
      );
    }

  }
}

export const setTunerConfig = (
  tuners: TunersConfig,
  tuner: TunerConfig,
  index: string
): AppThunk => {
  return async (dispatch) => {
    dispatch(tunersRequestStart());

    try {
      const newTuners = { ...tuners };
      console.log(tuners);
      newTuners[index] = tuner;
      const body = {
        [index]: tuner,
      };
      let form = new FormData();
      form.append("config", JSON.stringify(body));
      const response = await Axios.post<TeracueTunerConfigSuccess>(
        TUNERS_CONFIGURATIONS,
        form,
        {
          headers: {
            "Content-Type": "text/plain",
          },
        }
      );
      if (!response.data.success) {
        throw {
          code: 500,
          message: response.data.message,
        };
      }

      dispatch(tunersRequestSuccess({ ...newTuners }));
    } catch (error) {
      console.log(error);
      dispatch(
        tunersRequestFail({
          code: error.code,
          message: error.message,
        })
      );
    }
  };
};

export const callResetTunersConfigChanged = () : AppThunk => {
  return (dispatch) => {
    dispatch(resetTunersConfigChanged());
  }
}

export const toggleTunersConfigChanged = (
  tunerid: string,
  config: TunerConfig | false
) : AppThunk => {
  return (dispatch) => {
    if(config)
      dispatch(setTunersConfigChanged([tunerid, config]));
    else
      dispatch(unsetTunersConfigChanged(tunerid));
  }
}