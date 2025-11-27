import axios, { AxiosError } from "axios";
import {
  useMutation,
  UseMutationResult,
  useQueryClient,
} from "@tanstack/react-query";
import { CommentPost, CommentResponse } from "../types";

const requestData = async (data: CommentPost): Promise<CommentResponse> => {
  const result = await axios.post<CommentResponse>(
    "http://localhost:5005/comments",
    data
  );

  return result.data;
};

const useAddCommentPost = (): UseMutationResult<
  CommentResponse,
  AxiosError,
  CommentPost
> => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: requestData,
    onMutate: (data) => {
      // old data
      const savedComments = queryClient.getQueryData([
        "comments",
        { post_id: data.post_id.toString() },
      ]);

      //optimistic update
      const comment = { ...data, id: new Date() };

      queryClient.setQueryData(
        ["comments", { post_id: data.post_id }],
        (comments: CommentResponse[]) => {
          return [comment, ...comments];
        }
      );

      //the rollback
      return () => {
        queryClient.setQueryData(
          ["comments", { post_id: data.post_id }],
          savedComments
        );
      };
    },
    onError: (_, __, rollback) => {
      if (rollback) {
        rollback();
      }
    },
    onSuccess: () => {
      console.log("added");
    },
  });
};

export default useAddCommentPost;
