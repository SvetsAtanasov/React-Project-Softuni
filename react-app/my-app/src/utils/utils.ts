type Method = "GET" | "POST" | "PUT" | "DELETE";

const generateHeaders = (
  token: any
): { "Content-Type": string; authorization?: any } =>
  token !== null
    ? {
        "Content-Type": "application/json",
        authorization: JSON.stringify(token),
      }
    : { "Content-Type": "application/json" };

const generateBody = (body: any): any => JSON.stringify(body);

export const request = {
  get: (url: string, token: string | null = null) => {
    return fetch(url, {
      method: "GET",
      headers: {
        ...generateHeaders(token),
      },
    });
  },
  post: (url: string, token: string | null = null, body: any = null) => {
    return fetch(url, {
      method: "POST",
      headers: { ...generateHeaders(token) },
      body: generateBody(body),
    });
  },
  put: (url: string, token: string | null = null, body: any) => {
    return fetch(url, {
      method: "PUT",
      headers: { ...generateHeaders(token) },
      body: generateBody(body),
    });
  },
  delete: (url: string, token: string | null = null, body: any) => {
    return fetch(url, {
      method: "DELETE",
      headers: { ...generateHeaders(token) },
      body: generateBody(body),
    });
  },
};

export const photoTimestampHandler = (timestamp: number): string => {
  if (timestamp / 60 / 60 >= 24) {
    return `${(timestamp / 60 / 60 / 24).toFixed(0)} days ago`;
  } else if (timestamp / 60 >= 60) {
    return `${(timestamp / 60 / 60).toFixed(0)} hours ago`;
  }

  return `${new Date(timestamp * 1000).getMinutes()} minutes ago`;
};
