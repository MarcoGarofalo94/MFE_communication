import Axios, {INTERFACE_TUNERS_STATUS, TUNERS_CONFIGURATIONS, TUNERS_STATUS} from "@config/axios";
import {
  fetchTunersStatusFail,
  fetchTunersStatusStart,
  fetchTunersStatusSuccess, resetTunersStatus,
} from "@store-app/reducers/tunerStatus";
import { AppThunk } from "@store-app/store";

let calledResetTunerStatus = false;

export const fetchTunersStatus = (): AppThunk => {
  return async (dispatch) => {
    dispatch(fetchTunersStatusStart());
    try {
      const response = await Axios.get<TeracueTunerStatusSuccess>(
        INTERFACE_TUNERS_STATUS
      );
      console.log(response);
      if (!response.data.success)
        throw {
          code: 200,
          message: response.data.message,
        };
      const tuners = { ...response.data.result };
      if(!calledResetTunerStatus)
        dispatch(fetchTunersStatusSuccess(tuners));
      calledResetTunerStatus = false;
    } catch (error) {
      if(!calledResetTunerStatus)
        dispatch(
          fetchTunersStatusFail({
            code: error.code,
            message: error.message,
          })
        );
      calledResetTunerStatus = false;
    }
  };
};


export const callResetTunersStatus = () : AppThunk => {
  return (dispatch) => {
    calledResetTunerStatus = true;
    dispatch(resetTunersStatus());
  }
};