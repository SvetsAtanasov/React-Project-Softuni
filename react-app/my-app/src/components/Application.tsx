import Navigation from "../components/Nav";
import { AuthProvider } from "../context/AuthStore";
import PhotoProvider from "../context/PhotoStore";
import { ThemeProvider } from "../context/ThemeStore";
import Wrapper from "../components/Wrapper";
import { Route, Routes } from "react-router-dom";
import HomePage from "../pages/Home";
import CatalogPage from "../pages/Catalog";
import ErrorPage from "../pages/404";
import LoginPage from "../pages/Login";
import RegisterPage from "../pages/Register";
import PostPage from "../pages/Post";
import Create from "../pages/Create";
import ProtectedRoutes from "./ProtectedRoutes";

const Application = () => {
  return (
    <ThemeProvider>
      <Wrapper>
        <AuthProvider>
          <Navigation />
          <PhotoProvider>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/catalog" element={<CatalogPage />} />

              <Route element={<ProtectedRoutes protectedType={"private"} />}>
                <Route path="/catalog/:photoId" element={<PostPage />} />
                <Route path="/create" element={<Create />} />
              </Route>
              <Route element={<ProtectedRoutes protectedType={"public"} />}>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
              </Route>

              <Route path="*" element={<ErrorPage />} />
            </Routes>
          </PhotoProvider>
        </AuthProvider>
      </Wrapper>
    </ThemeProvider>
  );
};

export default Application;
