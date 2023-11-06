import { useState, useCallback } from "react";
import { api_url } from "../constants";

export const useFetchFPL = (token?: string) => {
  const [data, setData] = useState<any>({ fetch: 0 });
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const callApi = useCallback(
    (url: string) => {
      setIsLoading(true);
      const url_send = `${api_url}${url}`;

      fetch(url_send, { method: "GET", redirect: "follow" })
        .then((response) => response.text())
        .then((result) => {
          setIsLoading(false);
          setData(result);
        })
        .catch((error) => {
          setIsLoading(false);
          setData({ error: error });
        });
    },
    [token]
  );

  return [data, callApi, isLoading];
};
