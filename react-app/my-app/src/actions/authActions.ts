export const reducer = (state: any, action: any) => {
  switch (action.type) {
    case "set_error":
      return {
        ...state,
        error: action.nextError,
      };

    case "set_success":
      return {
        ...state,
        success: action.nextSuccess,
      };

    case "set_token":
      return {
        ...state,
        token: action.nextToken,
      };
  }
};
