export type CustomPostProps = React.PropsWithChildren<{
  photo: any;
}>;

const Post = ({ photo }: CustomPostProps) => {
  return <span>{photo._id}</span>;
};

export default Post;
