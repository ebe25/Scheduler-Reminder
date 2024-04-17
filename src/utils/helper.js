import axios from "axios";
import { BASE_URL } from "./api-config";
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
    const response = await fetch(`${BASE_URL}/todos`, {
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
    const response = await fetch(`${BASE_URL}/users`);
    return response;
  } catch (error) {
    console.log("Error while getting users ", error);
    throw new Error("Error while getting users ");
  }
}
export async function UserData() {
  try {
    const response = await axios.get(`${BASE_URL}/users`);
    if (response.status !== 200) {
      throw new Error(`Request failed with ${response.status}`);
    }
    return response.data;
  } catch (error) {
    console.log("Error while getting users ", error);
    throw new Error("Error while getting users ");
  }
}

export const capsInitials = (item) => {
  //item is a string
  //item -> "hey there bro supp"
  return item
    .split(" ")
    .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
    .join(" ");
  //return -> "Hey There Bro Supp"
};
