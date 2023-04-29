const generateHeaders = (
  token: any
): { "Content-Type": string; authorization?: any } =>
  token
    ? {
        "Content-Type": "application/json",
        authorization: JSON.stringify(token),
      }
    : { "Content-Type": "application/json" };

const generateBody = (body: any): any => (body ? JSON.stringify(body) : null);

export const requestHandler = async (
  method: string,
  url: string,
  token: any = null,
  body: any = null
) => {
  return await fetch(url, {
    method: method,
    headers: {
      ...generateHeaders(token),
    },
    body: generateBody(body),
  });
};

export const photoTimestampHandler = (timestamp: number): string => {
  if (timestamp / 60 >= 60) {
    return `${(timestamp / 60 / 60).toFixed(0)} hours ago`;
  }
  return `${new Date(timestamp * 1000).getMinutes()} minutes ago`;
};
