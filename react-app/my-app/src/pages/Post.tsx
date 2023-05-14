import { Suspense, lazy, useEffect, useContext } from "react";
import { Spinner } from "react-bootstrap";
import { PhotoStore } from "../context/PhotoStore";
import { useParams } from "react-router-dom";

const Post = lazy(() => import("../components_react/Post"));

const PostPage = () => {
  const { handleGetSpecificPhoto, photo } = useContext(PhotoStore);
  const params = useParams();

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
