import {
  createContext,
  useCallback,
  useEffect,
  useReducer,
  useState,
} from "react";
import { PHOTO_ACTIONS, photoReducer } from "../actions/photoActions";

export type Photo = {
  handleGetAllPhotos: () => any;
  allPhotos: any;
};

export const PhotoStore = createContext<Photo>({
  handleGetAllPhotos: () => {},
  allPhotos: [],
});

const { Provider } = PhotoStore;

export const PhotoProvider = ({ children }: any) => {
  const [allPhotos, setPhotos] = useState([]);

  const handleGetAllPhotos = useCallback(async () => {
    try {
      const res = await fetch("http://localhost:7777/catalog");
      const photos = await res.json();

      setPhotos((arr: any) => (arr = photos));
    } catch (err: any) {
      console.log(err);
    }
  }, []);

  return (
    <Provider value={{ handleGetAllPhotos, allPhotos }}>{children}</Provider>
  );
};

export default PhotoProvider;
