import { Suspense, useContext, useEffect } from "react";
import Spinner from "react-bootstrap/Spinner";
import { PhotoStore } from "../context/PhotoStore";
import { lazy } from "react";
import { Container } from "react-bootstrap";

const Catalog = lazy(() => import("../components/Catalog"));

const CatalogPage = () => {
  const { allPhotos, handleGetAllPhotos, handleSendMessageToServer } =
    useContext(PhotoStore);

  useEffect(() => {
    handleGetAllPhotos();
  }, [handleGetAllPhotos]);

  return (
    <Suspense fallback={<Spinner className={"spinner"} />}>
      <Container className={"mw-100"}>
        <Catalog ws={handleSendMessageToServer} photos={allPhotos} />
      </Container>
    </Suspense>
  );
};

export default CatalogPage;
