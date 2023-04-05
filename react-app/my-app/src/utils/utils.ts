export const reducer = (state: any, action: any) => {
  switch (action.type) {
    case "set_error":
      return {
        ...state,
        error: action.nextError,
      };
  }
};
