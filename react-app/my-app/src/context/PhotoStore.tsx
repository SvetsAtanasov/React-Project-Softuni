import {
  createContext,
  useCallback,
  useContext,
  useReducer,
  useState,
} from "react";
import { PHOTO_ACTIONS, photoReducer } from "../actions/photoActions";
import { useNavigate } from "react-router-dom";
import { AuthStore } from "./AuthStore";

export type Photo = {
  handleGetAllPhotos: () => any;
  handleGetCreatePhotoRoute: () => any;
  allPhotos: any;
};

export const PhotoStore = createContext<Photo>({
  handleGetAllPhotos: () => {},
  handleGetCreatePhotoRoute: () => {},
  allPhotos: [],
});

const { Provider } = PhotoStore;

export const PhotoProvider = ({ children }: any) => {
  const navigate = useNavigate();
  const [allPhotos, setPhotos] = useState([]);
  const { dispatchToken, token } = useContext(AuthStore);

  const handleGetAllPhotos = useCallback(async () => {
    try {
      const res = await fetch("http://localhost:7777/catalog");
      const photos = await res.json();

      setPhotos((arr: any) => (arr = photos));
    } catch (err: any) {
      console.log(err);
    }
  }, []);

  const handleCreatePhoto = useCallback(async (photo: any) => {}, []);

  const handleGetCreatePhotoRoute = useCallback(async () => {
    const res = await fetch("http://localhost:7777/create", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: token.token,
      },
    });

    if (res.status === 401) {
      localStorage.removeItem("token");
      dispatchToken({ type: "set_token", nextToken: undefined });
      navigate("/login");
    }
  }, [dispatchToken, navigate, token.token]);

  return (
    <Provider
      value={{ handleGetAllPhotos, handleGetCreatePhotoRoute, allPhotos }}
    >
      {children}
    </Provider>
  );
};

export default PhotoProvider;
