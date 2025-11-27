import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import config from "../config";

const deletePost = async (id: number) => {
  const deleteRequest = await axios.delete(`${config.apiUrl}/posts/${id}`);
  return deleteRequest.data;
};
const useRemovePost = () => {
  const queryClint = useQueryClient();
  return useMutation({
    mutationFn: deletePost,
    onSuccess: () => {
      queryClint.invalidateQueries({
        queryKey: ["posts"],
        exact: false,
      });
    },
  });
};

export default useRemovePost;