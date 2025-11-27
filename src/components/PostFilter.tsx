import { Form } from "react-bootstrap";
import { PostTypeStatus } from "../types";

interface PostFilterProps {
  selectedPostStatus: PostTypeStatus;
  setSelectedPostStatus: (value: PostTypeStatus) => void;
}

export const PostFilter = ({
  selectedPostStatus,
  setSelectedPostStatus,
}: PostFilterProps) => {
  const onChangeHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedPostStatus(e.target.value as PostTypeStatus);
  };

  return (
    <>
      <h5>Filter By Status</h5>
      <Form.Select value={selectedPostStatus} onChange={onChangeHandler}>
        <option value="all">Select Status</option>
        <option value="publish">Publish</option>
        <option value="draft">Draft</option>
        <option value="block">Block</option>
      </Form.Select>
    </>
  );
};
