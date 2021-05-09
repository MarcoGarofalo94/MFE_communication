import { NCResponseError, OptionsResponse } from "@store-app/types/options";

export const checkNCResponseError = (
  data: NCResponseError & OptionsResponse
) => {
  if (!data.success || !data.result) {
    throw {
      class: data.class,
      message: data.message,
      success: data.success,
    } as NCResponseError;
  }
};
