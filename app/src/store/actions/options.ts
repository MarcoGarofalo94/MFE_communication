import axios from '@nextcloud/axios';
import { fetchOptionsFail, fetchOptionsStart, fetchOptionsSuccess } from '@store-app/reducers/options';
import { OptionsError, OptionsResponse } from '@store-app/types/options';
import { AppThunk } from '@store-app/store';
import { checkNCResponseError } from '@utils/errorHandling';

export const fetchOptions = (URL: string): AppThunk => {
  return async (dispatch) => {
    dispatch(fetchOptionsStart());
    try {
      const response = await axios.get<OptionsResponse & OptionsError>(
        URL
      );
      console.log('[HTTP Response from REDUX]',response);
      checkNCResponseError(response.data);
      dispatch(fetchOptionsSuccess(response.data.result));
    } catch (error) {
      console.log('[HTTP ERROR from REDUX]',error);
      dispatch(fetchOptionsFail(error));
    }
  };
};
