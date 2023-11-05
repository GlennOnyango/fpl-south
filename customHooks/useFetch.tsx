import { useState, useCallback } from "react";
import { main_url } from "../constants";

export const useFetch = (token?: string) => {
  const [data, setData] = useState<any>({ fetch: 0 });
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const callApi = useCallback(
    (url: string, formData?: any) => {
      setIsLoading(true);
      const url_send = formData
        ? `${main_url}${url}${formData}`
        : `${main_url}${url}`;

      const extra = token
        ? {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        : {};
      fetch(url_send, extra)
        .then((res) => {
          if (!res.ok) {
            const error = new Error(res.statusText);
            throw error;
          }

          return res.json();
        })
        .then((data) => {
          setIsLoading(false);
          setData(data);
        })
        .catch((err) => {
          setIsLoading(false);
          setData({ error: err.message });
        });
    },
    [token]
  );

  return [data, callApi, isLoading];
};
