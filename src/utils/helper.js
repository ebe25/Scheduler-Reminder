import axios from "axios"
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
export async function currentUserData() {
  try {
    const response = await fetch("http://localhost:8000/api/v1/users");
    return response;
  } catch (error) {
    console.log("Error while getting users ", error);
    throw new Error("Error while getting users ");
  }
}
export async function UserData() {
  try {
    const response = await axios.get("http://localhost:8000/api/v1/users");
    if(response.status!==200){
      throw new Error(`Request failed with ${response.status}`)
    }
    return response.data;
  } catch (error) {
    console.log("Error while getting users ", error);
    throw new Error("Error while getting users ");
  }
}

export const capsInitials = (item) => {
  console.log("-----",item)
  //item is a string
  //item -> "hey there bro supp"
  return item
    .split(" ")
    .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
    .join(" ");
  //return -> "Hey There Bro Supp"
};
