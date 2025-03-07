export const makeApiRequest = async (url, requestType, bodyObject = null) => {
  try {
    const requestOptions = { ...requestType };

    if (bodyObject) {
      requestOptions.body = JSON.stringify(bodyObject);
    }

    const response = await fetch(url, requestOptions);

    if (!response.ok) {
      throw new Error("Failed to update data");
    }

    const data = await response.json();
    console.log("Data updated:", data);

    return data;
  } catch (error) {
    console.error("Error while sending request:", error.message);
    return null;
  }
};
