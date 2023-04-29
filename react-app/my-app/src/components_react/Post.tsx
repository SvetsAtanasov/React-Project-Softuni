import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as faHeartOutlined } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useCallback, useContext, useRef, useState } from "react";
import { Button } from "react-bootstrap";
import { AuthStore } from "../context/AuthStore";
import { requestHandler, photoTimestampHandler } from "../utils/utils";

export type CustomPostProps = React.PropsWithChildren<{
  photo: {
    _id: string;
    name: string;
    image: string;
    age: number;
    description: string;
    location: string;
    commentList: { userId: string; username: string; comment: string }[];
    likes: { userId: string; username: string; like: boolean }[];
    owner: { userId: string; username: string };
    timestamp: string;
  };
}>;

const Post = ({ photo }: CustomPostProps) => {
  const [commentsExpanded, setCommentsExpanded] = useState<boolean>();
  const { username } = useContext(AuthStore);
  const [isLiked, setIsLiked] = useState(
    photo.likes.find((x: any) => x.username === username)?.like
  );
  const diffTimestamp =
    +(new Date().getTime() / 1000).toFixed(0) - +photo.timestamp;

  const postRef = useRef<any>(null);

  const handleExpandComments = () => {
    setCommentsExpanded(!commentsExpanded);
  };

  const handleLikePost = () => {
    setIsLiked(!isLiked);
  };

  const handleLikeDislikePost = useCallback(async () => {
    const res = await requestHandler(
      "PUT",
      `http://localhost:7777/catalog/${postRef.current.dataset.id}/like`,
      null,
      {
        id: postRef.current.dataset.id,
        likeObj: { userId: null, username: username, like: !isLiked },
      }
    );
  }, [postRef]);

  return (
    <div
      ref={postRef}
      data-id={photo._id}
      className="post ms-auto me-auto pb-3"
    >
      <div className="photo-information-container d-flex flex-column">
        <span className="username">{photo.owner.username}</span>
        <span className="location">{photo.location}</span>
      </div>
      <div className="image-container">
        <img src={photo.image} alt={photo.image} />
      </div>
      <div className="footer-container">
        <div className="buttons-container">
          <div onClick={handleLikeDislikePost}>
            <FontAwesomeIcon
              className="like-button"
              icon={isLiked ? faHeart : faHeartOutlined}
              onClick={handleLikePost}
            />
          </div>
        </div>

        <div className="likes-container">
          <span className="likes">{`${photo.likes.length} likes`}</span>
        </div>

        <div className="comments-container d-flex">
          {commentsExpanded ? (
            <>
              <div className="comment-username"></div>
              <div className="comment"></div>
            </>
          ) : (
            <>
              <div className="comment-username"></div>
              <div className="comment"></div>
            </>
          )}

          {commentsExpanded ? (
            <Button
              onClick={(e: any) => {
                e.stopPropagation();
                handleExpandComments();
              }}
              className="collapse d-inline-block"
              variant={"light"}
            >
              Collapse Comments
            </Button>
          ) : (
            <Button
              onClick={handleExpandComments}
              className="expand d-inline-block"
              variant={"light"}
            >
              Expand Comments
            </Button>
          )}
        </div>

        <div className="timestamp-post-container">
          <span className="timestamp">
            {photoTimestampHandler(diffTimestamp)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Post;
