export const PHOTO_ACTIONS = {
  ALL: "ALL_PHOTOS",
};

export const photoReducer = (state: any, action: any) => {
  switch (action.type) {
    case "ALL_PHOTOS":
      return {
        ...state,
        photos: action.nextPhotos,
      };
  }
};
