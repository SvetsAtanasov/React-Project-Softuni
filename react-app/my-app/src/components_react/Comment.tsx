import { useRef, useState } from "react";
import Dialog from "./Dialog";

export type CustomCommentProps = React.PropsWithChildren<{
  comment: {
    userId: string;
    username: string;
    comment: string;
    _id: string;
  };
  handleDeleteComment: (ref: any) => void;
}>;

const Comment = ({ comment, handleDeleteComment }: CustomCommentProps) => {
  const [open, setOpen] = useState<boolean>(false);
  const commentRef = useRef<any>(null);

  const handleOpen = (open: boolean) => {
    setOpen(open);
  };

  const dialogOptions = [
    {
      title: "Delete",
      handler: () => handleDeleteComment(commentRef),
    },
  ];

  return (
    <div
      ref={commentRef}
      data-id={comment._id}
      className="comment-wrapper d-flex"
    >
      <div className="me-3 comment-username">{comment.username}</div>
      <div className="comment">{comment.comment}</div>
      <div className="ms-auto">
        <Dialog options={dialogOptions} open={open} handleOpen={handleOpen} />
      </div>
    </div>
  );
};

export default Comment;
