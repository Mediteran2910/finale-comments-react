export async function fetchComments() {
  try {
    const response = await fetch("http://localhost:8000/comments");
    return response.json();
  } catch (error) {
    console.error("Erro while fetching", error);
    return null;
  }
}
