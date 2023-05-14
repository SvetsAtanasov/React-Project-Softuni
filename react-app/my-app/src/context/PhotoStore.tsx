import { createContext, useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { requestHandler } from "../utils/utils";
import { w3cwebsocket as W3CWebSocket } from "websocket";

const client = new W3CWebSocket("ws://localhost:7777/catalog");

export type Photo = {
  handleGetAllPhotos: () => any;
  handleGetCreatePhotoRoute: (dispatchToken: any, token: any) => any;
  handleCreatePhoto: (photo: any) => any;
  handleSendMessageToServer: (messageType: string) => void;
  handleGetSpecificPhoto: (params: any) => any;
  photo: any;
  allPhotos: any;
};

export const PhotoStore = createContext<Photo>({
  handleGetAllPhotos: () => {},
  handleGetCreatePhotoRoute: (dispatchToken: any) => {},
  handleCreatePhoto: () => {},
  handleSendMessageToServer: (messageType: string) => {},
  handleGetSpecificPhoto: (params: any) => {},
  photo: {},
  allPhotos: [],
});

const { Provider } = PhotoStore;

export const PhotoProvider = ({ children }: any) => {
  const navigate = useNavigate();
  const [allPhotos, setPhotos] = useState([]);
  const [photo, setPhoto] = useState({});

  const handleSendMessageToServer = (messageType: string) => {
    client.send(JSON.stringify({ type: messageType }));
  };

  useEffect(() => {
    client.onopen = () => {
      client.send(JSON.stringify({ type: "Connection_Established" }));
    };

    client.onmessage = (message: any) => {
      const photos = JSON.parse(message.data);
      setPhotos(photos);
    };

    return () => {
      client.close();
    };
  }, []);

  const handleGetAllPhotos = useCallback(async () => {
    try {
      const res = await requestHandler("GET", "http://localhost:7777/catalog");
      const photos = await res.json();

      setPhotos((arr: any) => (arr = photos));
    } catch (err: any) {}
  }, []);

  const handleGetSpecificPhoto = useCallback(async (params: any) => {
    console.log(params.photoId);
    const res = await requestHandler(
      "GET",
      `http://localhost:7777/catalog/${params.photoId}`
    );

    const photo = await res.json();

    setPhoto(photo);
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

      if (res.status === 401) {
        localStorage.removeItem("token");
        window.dispatchEvent(new Event("storage"));
        navigate("/login");
      } else if (res.ok) {
        navigate("/catalog");
      }
    },
    [navigate]
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
        handleSendMessageToServer,
        handleGetAllPhotos,
        handleGetCreatePhotoRoute,
        handleCreatePhoto,
        handleGetSpecificPhoto,
        photo,
        allPhotos,
      }}
    >
      {children}
    </Provider>
  );
};

export default PhotoProvider;
