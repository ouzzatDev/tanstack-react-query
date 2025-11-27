import axios from "axios";
import { DataItem } from "../types";
import {
  useQuery,
  useQueryClient,
  UseQueryResult,
} from "@tanstack/react-query";
import config from "../config";

const fetchData = async (id: string): Promise<DataItem> => {
  const result = await axios.get<DataItem>(`${config.apiUrl}/posts/${id}`);
  return result.data;
};

const useGetSinglePost = (
  id: string,
  paramKey: string,
  paramType: string
): UseQueryResult<DataItem> => {
  const queryClient = useQueryClient();

  let getCashedData: DataItem[] | undefined;

  if (paramType === "paginate") {
    getCashedData = queryClient.getQueryData([
      "posts",
      { paginate: 1, selectedPostStatus: "all" },
    ]);
  } else {
    getCashedData = queryClient.getQueryData([
      ["posts", "search", { q: paramKey }],
    ]);
  }

  return useQuery({
    queryKey: ["posts", { id : +id }],
    queryFn: () => fetchData(id),
    initialData: () => {
        if(!getCashedData) {
            return undefined;
        } else {
            const result = getCashedData.find(el => el.id === +id);
            return result;
        }
    }
  });
};

export default useGetSinglePost;
