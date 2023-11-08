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

export const usePost = (token?: string, file?: boolean) => {
  const [data, setData] = useState<Record<string, any>>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errMessage, setErrMessage] = useState<string>("");

  const callApi = useCallback((formData: any, url: string) => {
    setIsLoading(true);
    const url_send = `${main_url}${url}`;
    const extra: Extra = {
      method: "POST",
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
          errFinder(res);
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
  }, []);

  const errFinder = async (response: Response) => {
    const data = response.json();
    const error = await data;

    const errorList = Object.keys(error);

    if (errorList.length > 0) {
      setErrMessage(`${error[errorList[0]][0][0].toUpperCase()}${error[errorList[0]][0].slice(1)}`);
    } else {
      setErrMessage("Error occured");
    }
  };

  return [data, callApi, isLoading, errMessage] as const;
};
