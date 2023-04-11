import { Container } from "react-bootstrap";
import Post from "./Post";

export type CustomCatalogProps = React.PropsWithChildren<{
  photos: any;
}>;

const Catalog = ({ photos }: CustomCatalogProps) => {
  return (
    <Container>
      {photos.map((photo: any, idx: number) => (
        <Post photo={photo} />
      ))}
    </Container>
  );
};

export default Catalog;
