import { useState, useCallback } from "react";

import { main_url } from "../constants";

type Extra = {
  method: string;
  headers: {
    "Content-Type"?: string;
    Authorization?: string;
  };
  body: string;
};

export const usePut = (token?: string, file?: boolean) => {
  const [data, setData] = useState<Record<string, unknown>>({});

  const callApi = useCallback((formData: any, url: string) => {
    const url_send = formData ? `${main_url}${url}` : `${url}`;
    const extra: Extra = {
      method: "PUT",
      headers: token
        ? !file
          ? {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            }
          : { Authorization: `Bearer ${token}` }
        : { "Content-Type": "application/json" },
      body: file ? formData : JSON.stringify(formData),
    };

    fetch(url_send, extra)
      .then((res) => {
        if (!res.ok) {
          const error = new Error(res.statusText);
          throw error;
        }

        return res.json();
      })
      .then((data) => {
        setData(data);
      })
      .catch((err) => {
        setData({ error: err.message });
      });
  }, []);

  return [data, callApi] as const;
};
