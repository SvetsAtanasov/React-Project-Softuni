import { Container } from "react-bootstrap";
import Post from "./Post";

export type CustomCatalogProps = React.PropsWithChildren<{
  photos: any;
  ws: (messageType: string) => void;
}>;

const Catalog = ({ photos, ws }: CustomCatalogProps) => {
  return (
    <Container className="pt-3">
      {photos.map((photo: any, idx: number) => (
        <Post ws={ws} key={idx} photo={photo} />
      ))}
    </Container>
  );
};

export default Catalog;
