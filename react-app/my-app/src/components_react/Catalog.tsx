import { Container } from "react-bootstrap";
import Post from "./Post";

export type CustomCatalogProps = React.PropsWithChildren<{
  photos: any;
}>;

const Catalog = ({ photos }: CustomCatalogProps) => {
  return (
    <Container className="pt-3">
      {photos.map((photo: any, idx: number) => (
        <Post key={idx} photo={photo} />
      ))}
    </Container>
  );
};

export default Catalog;
