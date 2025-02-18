export const deleteData = async (url) => {
  try {
    const response = await fetch(url, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Failed to update score");
    }

    const data = await response.json();
    console.log("Score updated:", data);

    return data;
  } catch (error) {
    console.error("Error while sending request", error);
    return null;
  }
};
