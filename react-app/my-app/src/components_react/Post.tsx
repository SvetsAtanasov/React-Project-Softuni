export type CustomPostProps = React.PropsWithChildren<{
  photo: any;
}>;

const Post = ({ photo }: CustomPostProps) => {
  return <span className="m-0">{photo._id}</span>;
};

export default Post;
