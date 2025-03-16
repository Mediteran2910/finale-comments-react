import { requestObjects } from "@services/requestObjects";

export const makeApiRequest = async (
  url: string,
  type: (typeof requestObjects)[keyof typeof requestObjects],
  body?: object,
) => {
  try {
    const request: RequestInit = { ...type };

    if (body) request.body = JSON.stringify(body);

    const response = await fetch(url, request);

    if (!response.ok) {
      throw new Error("Failed to update data");
    }

    const data = await response.json();

    return data;
  } catch {
    return null;
  }
};
