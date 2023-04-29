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
import { requestHandler } from "../utils/utils";

export type Photo = {
  handleGetAllPhotos: () => any;
  handleGetCreatePhotoRoute: (dispatchToken: any, token: any) => any;
  handleCreatePhoto: (photo: any) => any;
  allPhotos: any;
};

export const PhotoStore = createContext<Photo>({
  handleGetAllPhotos: () => {},
  handleGetCreatePhotoRoute: (dispatchToken: any) => {},
  handleCreatePhoto: () => {},
  allPhotos: [],
});

const { Provider } = PhotoStore;

export const PhotoProvider = ({ children }: any) => {
  const navigate = useNavigate();
  const [allPhotos, setPhotos] = useState([]);
  const { isAuth } = useContext(AuthStore);

  const handleGetAllPhotos = useCallback(async () => {
    try {
      const res = await requestHandler("GET", "http://localhost:7777/catalog");
      const photos = await res.json();

      setPhotos((arr: any) => (arr = photos));
    } catch (err: any) {
      console.log(err);
    }
  }, []);

  const handleCreatePhoto = useCallback(
    async (photo: any) => {
      const temptoken = JSON.parse(localStorage.getItem("token")!);

      const res = await requestHandler(
        "POST",
        "http://localhost:7777/create",
        temptoken,
        photo
      );

      if (res.ok) {
        navigate("/catalog");
      }
    },
    [isAuth]
  );

  const handleGetCreatePhotoRoute = async (dispatchToken: any, token: any) => {
    const temptoken = JSON.parse(localStorage.getItem("token")!);

    const res = await requestHandler(
      "GET",
      "http://localhost:7777/create",
      temptoken
    );

    if (res.status === 401) {
      localStorage.removeItem("token");
      dispatchToken();
      navigate("/login");
    }
  };

  return (
    <Provider
      value={{
        handleGetAllPhotos,
        handleGetCreatePhotoRoute,
        handleCreatePhoto,
        allPhotos,
      }}
    >
      {children}
    </Provider>
  );
};

export default PhotoProvider;
