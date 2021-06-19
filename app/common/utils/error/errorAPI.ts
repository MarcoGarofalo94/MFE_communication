

export const checkNCResponseError = (
  data: NCResponse & NCResponseError
) => {
  if (!data.success || !data.result) {
    throw {
      class: data.class,
      message: data.message,
      success: data.success,
    } as NCResponseError;
  }
};
