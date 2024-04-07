export async function fetcher(url) {
  try {
    const res = await fetch(url);
    return res.json();
  } catch (error) {
    console.log("Error whil fetching the url", error);
  }
}

export async function createSchedule(data) {
  try {
    const response = await fetch("http://localhost:8000/api/v1/todos", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response;
  } catch (error) {
    console.log("Error while clinet posting todos", error);
    throw new Error("Error while clinet posting todos");
  }
}
