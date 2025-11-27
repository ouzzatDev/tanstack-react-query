import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import useGetSinglePost from "../hooks/useGetSinglePost";
import { Button, Col, Form, Row } from "react-bootstrap";
import useAddCommentPost from "../hooks/useAddCommentPost";
import useGetComments from "../hooks/useGetCommentPost";
import { useQueryClient } from "@tanstack/react-query";

const Info = () => {
  const [params] = useSearchParams();
  const [comment, setComment] = useState("");
  const addComment = useAddCommentPost();

  const id = params.get("id") as string;
  const paramKey = params.get("paramKey") as string;
  const paramType = params.get("paramType") as string;

  const { isLoading, isError, error, data } = useGetSinglePost(
    id,
    paramKey,
    paramType
  );

  const {
    isLoading: isLoadData,
    data: dataComment,
  } = useGetComments(+id);

  if (isLoading) {
    return <div>Loading data please wait</div>;
  }

  if (isError) {
    return <div>Error {error.message}</div>;
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addComment.mutate(
      { body: comment, post_id: +id },
      {
        onSuccess: () => {
          setComment("");
          const queryClient = useQueryClient();
          queryClient.invalidateQueries({
            queryKey: ["comments"],
            exact: false,
          });
        },
      }
    );
  };

  return (
    <Row>
      <Col xs={6}>
        <div>
          <h4>Title: {data?.title}</h4>
          <p>Status: {data?.status}</p>
          <p>Top Rate: {data?.topRate}</p>
          <p>Body:</p>
          <hr />
          <h4 className="mb-2">Comments:</h4>
          <Form className="mb-3" onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Control
                as="textarea"
                rows={3}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
            </Form.Group>
            <Button
              variant="primary"
              type="submit"
              disabled={addComment.isPending}
            >
              Submit
            </Button>
          </Form>
          {isLoadData
            ? "Loading comments data ... "
            : dataComment?.map((el) => <p>{el.body}</p>)}
        </div>
      </Col>
    </Row>
  );
};

export default Info;
