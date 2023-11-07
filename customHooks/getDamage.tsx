import { useState, useCallback } from "react";

export const useGetDamage = () => {
  const [data, setData] = useState<any>({ fetch: 0 });
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const callApi = useCallback((userId: number, eventId: number) => {
    const url_send = `https://fantasy.premierleague.com/api/entry/${userId}/event/${eventId}/picks/`;

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
  }, []);

  return [data, callApi, isLoading];
};
