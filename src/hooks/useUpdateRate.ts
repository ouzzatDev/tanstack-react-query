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

const useUpdateRate = (): UseMutationResult<DataItem, AxiosError, TopRatePost> => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateRate,

    onMutate: (values) => {
      const queryKey = [
        "posts",
        { selectedStatus: "all", paginate: values.pageNumber }
      ];

      const oldData = queryClient.getQueryData<DataItem[]>(queryKey);

      queryClient.setQueryData<DataItem[]>(
        queryKey,
        (prev: DataItem[] | undefined) =>
          (prev ?? []).map((post: DataItem) =>
            post.id === values.postId
              ? { ...post, topRate: values.rateValue }
              : post
          )
      );

      return () => {
        queryClient.setQueryData(queryKey, oldData);
      };
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["posts"],
      });
    },

    onError: (_error, _values, rollback) => {
      rollback?.();
    },
  });
};


export default useUpdateRate;
