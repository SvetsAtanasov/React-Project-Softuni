import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Navigation from "./components_react/Nav";
import HomePage from "./pages/Home";
import CatalogPage from "./pages/Catalog";
import ErrorPage from "./pages/404";
import { Container } from "react-bootstrap";
import LoginPage from "./pages/Login";
import RegisterPage from "./pages/Register";
import { AuthProvider } from "./context/AuthStore";
import PhotoProvider from "./context/PhotoStore";
import Create from "./pages/Create";

function App() {
  return (
    <Container
      className="mw-100 position-relative m-0 pad"
      style={{ minHeight: "100vh" }}
    >
      <AuthProvider>
        <Navigation />
        <PhotoProvider>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/catalog" element={<CatalogPage />} />
            <Route path="/create" element={<Create />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </PhotoProvider>
      </AuthProvider>
    </Container>
  );
}

export default App;
