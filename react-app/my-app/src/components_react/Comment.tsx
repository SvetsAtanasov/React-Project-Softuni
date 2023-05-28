import { useContext, useRef, useState } from "react";
import Dialog from "./Dialog";
import { Button } from "react-bootstrap";
import { AuthStore } from "../context/AuthStore";

export type CustomCommentProps = React.PropsWithChildren<{
  comment: {
    userId: string;
    username: string;
    comment: string;
    _id: string;
  };
  handleDeleteComment: (ref: any) => void;
  handleEditPhotoComment: (ref: any, commentValue: string) => void;
}>;

const Comment = ({
  comment,
  handleDeleteComment,
  handleEditPhotoComment,
}: CustomCommentProps) => {
  const { username } = useContext(AuthStore);
  const [open, setOpen] = useState<boolean>(false);
  const [isEdit, setEdit] = useState<boolean>(false);
  const [editCommentValue, setEditCommentValue] = useState<string>(
    comment.comment
  );
  const commentRef = useRef<any>(null);

  const handleOpen = (open: boolean) => {
    setOpen(open);
  };

  const handleCommentValue = (e: any) => {
    setEditCommentValue(e.target.value);
  };

  const handleSubmitForm = (e: any) => {
    e.preventDefault();

    handleEditPhotoComment(commentRef, editCommentValue);
    setEdit(false);
  };

  const dialogOptions = [
    {
      title: "Delete",
      handler: () => handleDeleteComment(commentRef),
    },
    {
      title: "Edit",
      handler: () => {
        setEdit(true);
      },
    },
  ];

  return (
    <div
      ref={commentRef}
      data-id={comment._id}
      className="comment-wrapper d-flex flex-column"
    >
      {isEdit && (
        <div className="comment-form">
          <form className="d-flex">
            <input
              onChange={handleCommentValue}
              value={editCommentValue}
              name="comment"
              type="text"
            />

            <Button
              className="ms-auto"
              disabled={!editCommentValue.trim()}
              onClick={handleSubmitForm}
              variant="dark"
              type="submit"
            >
              Edit
            </Button>
          </form>
        </div>
      )}

      <div className="d-flex">
        <div className="me-3 comment-username">{comment.username}</div>
        <div className="comment">{comment.comment}</div>
        <div className="ms-auto">
          {username === comment.username && (
            <Dialog
              options={dialogOptions}
              open={open}
              handleOpen={handleOpen}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Comment;
