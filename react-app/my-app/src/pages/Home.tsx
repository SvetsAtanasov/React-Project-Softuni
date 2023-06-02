import { useContext, useEffect } from "react";
import { Container } from "react-bootstrap";
import { HomeProvider, HomeStore } from "../context/HomePageStore";
import logo from "../images/instagram-social-media-icon-7.jpg";

const Home = () => {
  const { handleHomeRequest } = useContext(HomeStore);

  useEffect(() => {
    handleHomeRequest();
  }, [handleHomeRequest]);

  return (
    <Container className="px-0 mw-100">
      <h1 className="d-block text-center">Home Page</h1>
      <div className="ms-auto me-auto">
        <img className="d-block ms-auto me-auto" src={logo} alt="" />
      </div>
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
