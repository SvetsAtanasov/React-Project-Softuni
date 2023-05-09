export type CustomAvatarProps = React.PropsWithChildren<{
  src: string;
  setImage: () => void;
  clearImage: () => void;
}>;

const Avatar = ({ src, setImage, clearImage }: CustomAvatarProps) => {
  return (
    <div className="avatar">
      <img src="" alt="" />
    </div>
  );
};

export default Avatar;
