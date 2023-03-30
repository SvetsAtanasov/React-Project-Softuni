import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Navigation from "./components_react/Nav";
import HomePage from "./pages/Home";
import CatalogPage from "./pages/Catalog";
import ErrorPage from "./pages/404";
import { Container } from "react-bootstrap";
import ThemeButton from "./components_react/ThemeButton";
import { StoreProvider } from "./context/Store";
import LoginPage from "./pages/Login";

function App() {
  return (
    <Container className="p-relative m-0 p-0 d-flex">
      <StoreProvider>
        <ThemeButton />
        <Navigation />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<CatalogPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </StoreProvider>
    </Container>
  );
}

export default App;
