import { createContext, useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { requestHandler } from "../utils/utils";
import { w3cwebsocket as W3CWebSocket } from "websocket";

const client = new W3CWebSocket("wss://instagram-clone-api-nlh3.onrender.com7");

export type Photo = {
  handleGetAllPhotos: () => any;
  handleGetCreatePhotoRoute: (dispatchToken: any, token: any) => any;
  handleCreatePhoto: (photo: any) => any;
  handleSendMessageToServer: (messageType: string) => void;
  handleDeletePhoto: (body: any) => void;
  allPhotos: any;
};

export const PhotoStore = createContext<Photo>({
  handleGetAllPhotos: () => {},
  handleGetCreatePhotoRoute: (dispatchToken: any) => {},
  handleCreatePhoto: () => {},
  handleSendMessageToServer: (messageType: string) => {},
  handleDeletePhoto: (body: any) => {},
  allPhotos: [],
});

const { Provider } = PhotoStore;

export const PhotoProvider = ({ children }: any) => {
  const navigate = useNavigate();
  const [allPhotos, setPhotos] = useState([]);

  const handleSendMessageToServer = (messageType: string) => {
    client.send(JSON.stringify({ type: messageType }));
  };

  useEffect(() => {
    client.onopen = () => {
      client.send("test");
      console.log("test");
    };

    client.onmessage = (message: any) => {
      const photos = JSON.parse(message.data);
      setPhotos(photos);
    };
  }, []);

  const handleDeletePhoto = useCallback(
    async (body: any) => {
      const token = JSON.parse(localStorage.getItem("token")!);

      try {
        const res = await requestHandler(
          "DELETE",
          `https://instagram-clone-api-nlh3.onrender.com/catalog/delete`,
          token,
          body
        );

        if (res.status === 401) {
          localStorage.removeItem("token");
          window.dispatchEvent(new Event("storage"));
          navigate("/login");
        }

        handleSendMessageToServer("Delete_Post");
      } catch (err: any) {}
    },
    [navigate]
  );

  const handleGetAllPhotos = useCallback(async () => {
    try {
      const res = await requestHandler(
        "GET",
        "https://instagram-clone-api-nlh3.onrender.com/catalog"
      );
      const photos = await res.json();

      setPhotos((arr: any) => (arr = photos));
    } catch (err: any) {}
  }, []);

  const handleCreatePhoto = useCallback(
    async (photo: any) => {
      const token = JSON.parse(localStorage.getItem("token")!);

      const res = await requestHandler(
        "POST",
        "https://instagram-clone-api-nlh3.onrender.com/create",
        token,
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
      "https://instagram-clone-api-nlh3.onrender.com/create",
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
        handleDeletePhoto,
        handleSendMessageToServer,
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
