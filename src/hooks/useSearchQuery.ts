import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { DataItem } from "../types";
import axios from "axios";

const fetchData = async (q: string): Promise<DataItem[]> => {
  const result = await axios.get<DataItem[]>(
    `http://localhost:5005/posts?q=${q}`
  );
  return result.data;
};

const useSearchQuery = (q: string): UseQueryResult<DataItem[]> => {
  return useQuery({
    queryKey: ["posts", "search", { q }],
    queryFn: () => fetchData(q),
    staleTime: 1000 * 60 * 5,
    enabled: q.length > 0,
  });
};

export default useSearchQuery;
