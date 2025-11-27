import axios from "axios";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { CommentResponse } from "../types";

export const fetchComments = async (
  post_id: number,
  signal: AbortSignal
): Promise<CommentResponse[]> => {
  const result = await axios.get<CommentResponse[]>(
    `http://localhost:5005/comments?post_id=${post_id}&_sort=id&_order=desc`,
    { signal }
  );
  return result.data;
};

const useGetComments = (post_id: number): UseQueryResult<CommentResponse[]> => {
  const query = useQuery({
    queryKey: ["comments", { post_id }],
    queryFn: ({ signal }) => fetchComments(post_id, signal),
  });
  return query;
};

export default useGetComments;
