import { useState, useCallback } from "react";

type userData = {
  id: number;
  cost: number;
};

export const useGetDamage = () => {
  const [dataCost, setData] = useState<userData[]>([]);
  const [isLoadingCost, setIsLoading] = useState<boolean>(false);
  const [errorCost, setError] = useState<any>(null);

  const getCost = useCallback((eventId: number, userArray: number[]) => {
    userArray.forEach((user) => {
      const url_send = `https://fantasy.premierleague.com/api/entry/${user}/event/${eventId}/picks/`;

      fetch(url_send, { method: "GET", redirect: "follow" })
        .then((response) => response.text())
        .then((result) => {
          setIsLoading(false);
          const dataEvent = JSON.parse(result);

          const transferCost = dataEvent["entry_history"]["event_transfers_cost"];

          setData((data) => [
            ...data,
            {
              id: user,
              cost: transferCost,
            },
          ]);
        })
        .catch((error) => {
          setIsLoading(false);
          setError({ error: error });
        });
    });
  }, []);

  return [dataCost, getCost, isLoadingCost, errorCost];
};
