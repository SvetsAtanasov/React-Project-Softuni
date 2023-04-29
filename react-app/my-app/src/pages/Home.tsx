import { useContext, useEffect } from "react";
import { Container } from "react-bootstrap";
import { HomeProvider, HomeStore } from "../context/HomePageStore";

const Home = () => {
  const { handleHomeRequest } = useContext(HomeStore);

  useEffect(() => {
    handleHomeRequest();
  }, [handleHomeRequest]);

  return (
    <Container className="px-0 mw-100">
      <h1>Home Page</h1>
    </Container>
  );
};

const HomePage = () => {
  return (
    <HomeProvider>
      <Home />
    </HomeProvider>
  );
};

export default HomePage;
