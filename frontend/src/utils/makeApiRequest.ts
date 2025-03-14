import { requestObjects } from "../services/requestObjects";

export const makeApiRequest = async (
  url: string,
  requestType: (typeof requestObjects)[string],
  bodyObject?: object,
) => {
  try {
    const requestOptions: RequestInit = { ...requestType };

    if (bodyObject) requestOptions.body = JSON.stringify(bodyObject);

    const response = await fetch(url, requestOptions);

    if (!response.ok) {
      throw new Error("Failed to update data");
    }

    const data = await response.json();

    return data;
  } catch (error) {
    return null;
  }
};
