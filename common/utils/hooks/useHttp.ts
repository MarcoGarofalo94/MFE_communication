import axios from "@nextcloud/axios";
import { AxiosRequestConfig } from "axios";
import React, { useCallback } from "react";

const useHttp = () => {
  const [error, setError] = React.useState<Error | null>(null);
  const [isLoading, setIsLoading] = React.useState(false);

  const sendRequest = useCallback(
    async <Res, Err>(
      requestConfig: AxiosRequestConfig,
      checkErrorCallback: (response: Res & Err & NCResponseError) => void,
      applyData: (data: Res) => any
    ) => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await axios.request<Res & Err & NCResponseError>({
          ...requestConfig,
        });
        checkErrorCallback(response.data);
        applyData(response.data);
      } catch (error) {
        console.log(error);
        setError(error);
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  return {
    isLoading,
    error,
    sendRequest,
  };
};

export default useHttp;
