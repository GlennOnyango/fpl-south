import { main_url } from "../../constants";

import { useMutation } from "react-query";
import axios from "axios";

export const usePost = (url: string, token?: string) => {
  const {
    data,
    error,
    reset,
    status,
    mutate,
    mutateAsync,
    isError,
    isIdle,
    isLoading,
    isSuccess,
    isPaused,
  } = useMutation(
    async (collectedData: any) => {
      //check if token is available
      if (token?.length === 0) {
        return axios.post(`${main_url}${url}`, collectedData, {
          headers: {
            "Content-Type": "application/json",
          },
          timeout: 30000,
        }).catch((err) => {
          console.log(err);
        });
      }

      return axios.post(`${main_url}${url}`, collectedData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
    },
    {
      onError: (err:any) => {
        console.log(err.response.data);
      },
    }
  );

  return {
    data,
    error,
    reset,
    status,
    mutate,
    mutateAsync,
    isError,
    isIdle,
    isLoading,
    isSuccess,
    isPaused,
  };
};
