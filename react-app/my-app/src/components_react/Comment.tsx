export type CustomCommentProps = React.PropsWithChildren<{
  comment: {
    userId: string;
    username: string;
    comment: string;
  };
}>;

const Comment = ({ comment }: CustomCommentProps) => {
  return (
    <div className="comment-wrapper d-flex">
      <div className="me-3 comment-username">{comment.username}</div>
      <div className="comment">{comment.comment}</div>
    </div>
  );
};

export default Comment;
