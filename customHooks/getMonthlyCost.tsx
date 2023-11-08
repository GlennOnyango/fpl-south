import { useState, useCallback } from "react";

type userData = {
  id: number;
  cost: number;
};

export const useGetDamage = () => {
  const [dataCost, setData] = useState<userData[]>([]);
  const [isLoadingCost, setIsLoading] = useState<boolean>(false);
  const [errorCost, setError] = useState<any>(null);

  const getCost = useCallback((eventIdArray: number[], user: number) => {
    let totalCost = 0;
    eventIdArray.forEach((event) => {
      const url_send = `https://fantasy.premierleague.com/api/entry/${user}/event/${event}/picks/`;

      fetch(url_send, { method: "GET", redirect: "follow" })
        .then((response) => response.text())
        .then((result) => {
          setIsLoading(false);
          const dataEvent = JSON.parse(result);

          const transferCost =
            dataEvent["entry_history"]["event_transfers_cost"];

          totalCost = totalCost + transferCost;
        })
        .catch((error) => {
          setIsLoading(false);
          setError({ error: error });
        });
    });

    setData((data) => [
      ...data,
      {
        id: user,
        cost: totalCost,
      },
    ]);
  }, []);

  return [dataCost, getCost, isLoadingCost, errorCost];
};
