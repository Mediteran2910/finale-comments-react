export const sendData = async (url, obj) => {
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(obj),
    });

    if (!response.ok) {
      throw new Error("Failed to update data");
    }

    const data = await response.json();
    console.log("data updated:", data);

    return data;
  } catch (error) {
    console.error("Error while sending request", obj);
    return null;
  }
};
