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
import RegisterPage from "./pages/Register";
import { AuthProvider } from "./context/AuthStore";

function App() {
  return (
    <Container className="mw-100 p-relative m-0 pad">
      <StoreProvider>
        <AuthProvider>
          <ThemeButton />
          <Navigation />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<CatalogPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </AuthProvider>
      </StoreProvider>
    </Container>
  );
}

export default App;
