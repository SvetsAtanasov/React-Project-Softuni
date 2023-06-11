import { Suspense, lazy, useEffect, useState, useCallback } from "react";
import { Spinner } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { request } from "../utils/utils";

const Post = lazy(() => import("../components/Post"));

const PostPage = () => {
  const [photo, setPhoto] = useState<{
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
  }>({
    _id: "",
    name: "",
    image: "",
    age: 0,
    description: "",
    location: "",
    commentList: [
      {
        userId: "",
        username: "",
        comment: "",
        _id: "",
      },
    ],
    likes: [{ userId: "", username: "", like: false }],
    owner: { userId: "", username: "" },
    timestamp: "",
  });
  const params = useParams();

  const handleGetSpecificPhoto = useCallback(async (params: any) => {
    const res = await request.get(
      `https://instagram-clone-api-nlh3.onrender.com/catalog/${params.photoId}`
    );

    const photo = await res.json();

    setPhoto(photo);
  }, []);

  useEffect(() => {
    handleGetSpecificPhoto(params);
  }, [handleGetSpecificPhoto, params]);

  return (
    <Suspense fallback={<Spinner className={"spinner"} />}>
      <div className="pt-5">
        <Post ws={(e: string) => {}} photo={photo} />
      </div>
    </Suspense>
  );
};

export default PostPage;
