import { Container } from "react-bootstrap";
import Post from "./Post";
import { useContext } from "react";
import { ThemeStore } from "../context/ThemeStore";

export type CustomCatalogProps = React.PropsWithChildren<{
  photos: any[];
  ws: (messageType: string) => void;
}>;

const Catalog = ({ photos, ws }: CustomCatalogProps) => {
  const { theme } = useContext(ThemeStore);

  return (
    <Container className="pt-3" style={{ minHeight: "100vh" }}>
      {photos.length > 0 ? (
        photos.map((photo: any, idx: number) => (
          <Post ws={ws} key={idx} photo={photo} />
        ))
      ) : (
        <span
          className={`d-block text-center ${
            theme === "dark" ? "text-white" : ""
          }`}
        >
          There are no posts yet!
        </span>
      )}
    </Container>
  );
};

export default Catalog;
