import { useState } from "react";
import Dialog from "./Dialog";

export type CustomCommentProps = React.PropsWithChildren<{
  comment: {
    userId: string;
    username: string;
    comment: string;
  };
}>;

const Comment = ({ comment }: CustomCommentProps) => {
  const [open, setOpen] = useState<boolean>(false);

  const handleOpen = (open: boolean) => {
    setOpen(open);
  };

  const dialogOptions = [
    {
      title: "Delete",
      handler: () => {
        console.log("deleted");
      },
    },
  ];

  return (
    <div className="comment-wrapper d-flex">
      <div className="me-3 comment-username">{comment.username}</div>
      <div className="comment">{comment.comment}</div>
      <div className="ms-auto">
        <Dialog options={dialogOptions} open={open} handleOpen={handleOpen} />
      </div>
    </div>
  );
};

export default Comment;
