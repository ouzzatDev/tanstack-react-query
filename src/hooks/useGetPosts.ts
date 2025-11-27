import axios from "axios";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { DataItem, PostTypeStatus } from "../types";
import config from "../config";

export const fetchPosts = async (
  selectedPostStatus: PostTypeStatus,
  paginate: number
): Promise<DataItem[]> => {
  if (selectedPostStatus === "all") {
    const result = await axios.get<DataItem[]>(
      `${config.apiUrl}/posts?_page=${paginate}&_limit=5`
    );
    return result.data;
  } else {
    const result = await axios.get<DataItem[]>(
      `${config.apiUrl}/posts?status=${selectedPostStatus}`
    );
    return result.data;
  }
};

const useGetPosts = (
  selectedPostStatus: PostTypeStatus,
  paginate: number
): UseQueryResult<DataItem[]> => {
  const query = useQuery({
    queryKey: ["posts", { selectedPostStatus, paginate }],
    queryFn: () => fetchPosts(selectedPostStatus, paginate),
    staleTime: 1000 * 60 * 1,
    refetchInterval: 1000 * 60 * 2,
  });
  return query;
};

export default useGetPosts;
