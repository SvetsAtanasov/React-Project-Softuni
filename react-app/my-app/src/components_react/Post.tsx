import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as faHeartOutlined } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { Button } from "react-bootstrap";
import { AuthStore } from "../context/AuthStore";
import { requestHandler, photoTimestampHandler } from "../utils/utils";
import { useNavigate } from "react-router-dom";
import Comment from "./Comment";
import Dialog from "./Dialog";

export type CustomPostProps = React.PropsWithChildren<{
  photo: {
    _id: string;
    name: string;
    image: string;
    age: number;
    description: string;
    location: string;
    commentList: {
      userId: string;
      username: string;
      comment: string;
      _id: string;
    }[];
    likes: { userId: string; username: string; like: boolean }[];
    owner: { userId: string; username: string };
    timestamp: string;
  };
  ws: (messageType: string) => void;
}>;

const Post = ({ photo, ws }: CustomPostProps) => {
  const [open, setOpen] = useState<boolean>(false);
  const [commentsExpanded, setCommentsExpanded] = useState<boolean>(false);
  const { username } = useContext(AuthStore);
  const [isLiked, setIsLiked] = useState<boolean | undefined>(
    photo.likes.find(
      (x: { userId: string; username: string; like: boolean }) =>
        x.username === username
    )?.like
  );

  const diffTimestamp =
    +(new Date().getTime() / 1000).toFixed(0) - +photo.timestamp;
  const [formData, setFormData] = useState<string>("");
  const postRef = useRef<any>(null);

  const dialogOptions = [
    {
      title: "Open Post",
      handler: () => {
        navigate(`/catalog/${postRef.current.dataset.id}`);
      },
    },
  ];

  const navigate = useNavigate();

  const handleExpandComments = () => {
    setCommentsExpanded(!commentsExpanded);
  };

  const handleLikePost = () => {
    setIsLiked(!isLiked);
  };

  const handleChange = (e: any) => {
    setFormData(e.target.value);
  };

  const toggleOpen = (open: boolean) => {
    setOpen(open);
  };

  const handleDeleteComment = useCallback(
    async (ref: any) => {
      const token = localStorage.getItem("token");

      if (token) {
        const res = await requestHandler(
          "DELETE",
          `http://localhost:7777/catalog/${ref.current.dataset.id}/delete`,
          JSON.parse(token),
          {
            postId: postRef.current.dataset.id,
            commentId: ref.current.dataset.id,
          }
        );

        if (res.status === 401) {
          localStorage.removeItem("token");
          window.dispatchEvent(new Event("storage"));
          navigate("/login");
        }
        ws("Delete_Post");
        setFormData("");
      }
    },
    [navigate, ws]
  );

  const handleEditPhotoComment = useCallback(
    async (ref: any, commentValue: string) => {
      const token = localStorage.getItem("token");

      if (token) {
        const res = await requestHandler(
          "PUT",
          `http://localhost:7777/catalog/${postRef.current.dataset.id}/edit`,
          JSON.parse(token),
          {
            commentId: ref.current.dataset.id,
            commentValue,
          }
        );

        if (res.status === 401) {
          localStorage.removeItem("token");
          window.dispatchEvent(new Event("storage"));
          navigate("/login");
        }
        ws("Delete_Post");
        setFormData("");
      }
    },
    [navigate, ws]
  );

  const handleSubmit = useCallback(
    async (e: any) => {
      e.preventDefault();

      const token = localStorage.getItem("token");

      if (token) {
        const res = await requestHandler(
          "PUT",
          `http://localhost:7777/catalog/${postRef.current.dataset.id}/comment`,
          JSON.parse(token),
          {
            id: postRef.current.dataset.id,
            commentObj: { userId: null, username: username, comment: formData },
          }
        );

        if (res.status === 401) {
          localStorage.removeItem("token");
          window.dispatchEvent(new Event("storage"));
          navigate("/login");
        }

        ws("Comment_Post");
        setFormData("");
      }
    },
    [formData, username, ws, navigate]
  );

  const handleLikeDislikePost = useCallback(async () => {
    const token = localStorage.getItem("token");

    if (token) {
      const res = await requestHandler(
        "PUT",
        `http://localhost:7777/catalog/${postRef.current.dataset.id}/like`,
        JSON.parse(token),
        {
          id: postRef.current.dataset.id,
          likeObj: { userId: null, username: username, like: !isLiked },
        }
      );

      if (res.status === 401) {
        localStorage.removeItem("token");
        window.dispatchEvent(new Event("storage"));
        navigate("/login");
      }

      ws("Like_Post");
    } else {
      navigate("/login");
    }
  }, [postRef, navigate, isLiked, username, ws]);

  return (
    <div
      ref={postRef}
      data-id={photo._id}
      className="post ms-auto me-auto pb-3"
    >
      <div className="p-2 photo-information-container d-flex flex-row">
        <span className="username">{photo.owner.username}</span>
        <span className="ms-auto me-3 location">{photo.location}</span>
        <Dialog handleOpen={toggleOpen} open={open} options={dialogOptions} />
      </div>

      <div className="image-container">
        <img src={photo.image} alt={photo.image} />
      </div>

      <div className="p-2 footer-container">
        <div className="buttons-container">
          <div
            className="like-wrapper d-inline-flex"
            onClick={handleLikeDislikePost}
          >
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

        {photo.commentList.length > 0 && (
          <div className="py-2 comments-container d-flex flex-column">
            {commentsExpanded ? (
              <div>
                <span
                  className="d-inline collapse"
                  onClick={() => handleExpandComments()}
                >
                  Collapse Comments
                </span>

                {photo.commentList.map(
                  (
                    comment: {
                      userId: string;
                      username: string;
                      comment: string;
                      _id: string;
                    },
                    idx: number
                  ) => (
                    <Comment
                      handleDeleteComment={handleDeleteComment}
                      handleEditPhotoComment={handleEditPhotoComment}
                      key={idx}
                      comment={comment}
                    />
                  )
                )}
              </div>
            ) : (
              <div>
                <span
                  className="d-inline expand"
                  onClick={() => handleExpandComments()}
                >
                  Expand Comments
                </span>
                <Comment
                  handleDeleteComment={handleDeleteComment}
                  handleEditPhotoComment={handleEditPhotoComment}
                  comment={photo.commentList[photo.commentList.length - 1]}
                />
              </div>
            )}
          </div>
        )}

        <div className="comment-form">
          <form className="d-flex" onSubmit={(e: any) => handleSubmit(e)}>
            <input
              value={formData}
              onChange={(e: any) => handleChange(e)}
              name="comment"
              placeholder="Write your comment..."
            />
            <Button
              disabled={!formData.trim()}
              className="ms-auto"
              variant="dark"
              type="submit"
            >
              Comment
            </Button>
          </form>
        </div>

        <div className="pt-1 timestamp-post-container">
          <span className="timestamp">
            {photoTimestampHandler(diffTimestamp)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Post;
