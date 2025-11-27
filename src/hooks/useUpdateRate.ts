import axios, { AxiosError } from "axios";
import {
  useMutation,
  UseMutationResult,
  useQueryClient,
} from "@tanstack/react-query";

import { DataItem, TopRatePost } from "../types";
import config from "../config";

const updateRate = async (rate: TopRatePost): Promise<DataItem> => {
  const result = await axios.patch<DataItem>(
    `${config.apiUrl}/posts/${rate.postId}`,
    { topRate: rate.rateValue }
  );
  return result.data;
};

const useUpdateRate = (): UseMutationResult<
  DataItem,
  AxiosError,
  TopRatePost
> => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateRate,
    onMutate: (values) => {
      const oldData = queryClient.getQueryData([
        "posts",
        { paginate: values.pageNumber, selectedStatus: "all" },
      ]);

      queryClient.setQueryData(
        ["posts", { paginate: values.pageNumber, selectedStatus: "all" }],
        (prevState: DataItem[]) =>
          prevState.map((el) => {
            if (el.id === values.postId) {
              return { ...el, topRate: values.rateValue };
            } else {
              return el;
            }
          })
      );

      return () => {
        queryClient.setQueryData(
          ["posts", { paginate: values.pageNumber, selectedStatus: "all" }],
          oldData
        );
      };
    },
    onError: (_, __, rollBack) => {
      if (rollBack) {
        rollBack();
      }
    },
  });
};

export default useUpdateRate;