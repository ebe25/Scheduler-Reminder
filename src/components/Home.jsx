import React, {useEffect, useState} from "react";
import activeUsers from "./ui/activeuser";
import mockData from "./ui/mockdata";
import MySpace from "./ui/myspace";
import {useAuth0} from "@auth0/auth0-react";
import io from "socket.io-client";
import axios from "axios";
import useFetchUsers from "../utils/useFetchUsers";
import {BASE_URL} from "../utils/api-config";

const Home = () => {
  const {users} = useFetchUsers(BASE_URL);
  const {getAccessTokenSilently, isAuthenticated, isLoading, user} = useAuth0();
  const [socket, setSocket] = useState(null);

  const createUser = async (data) => {
    try {
      if (data) {
        const res = await axios.post(`${BASE_URL}/users`, {
          name: data.name,
          email: data.email,
          picture: data.picture,
        });
        console.log("created user in db", res);
      } else {
        console.log("No data yet creating user");
      }
    } catch (error) {
      console.error("Error client", error);
    }
  };
  useEffect(() => {
    const trySilentAuth = async () => {
      try {
        await getAccessTokenSilently();
      } catch (error) {
        console.log("Silently token renewal failed", error);
      }
    };
    if (isLoading) {
      trySilentAuth();
    }

    if (user && isAuthenticated) {
      socket.emit("login", {userId: user?.name});
    }
  }, [isLoading]);
  useEffect(() => {
    const socketServer = io("http://localhost:8000");
    setSocket(socketServer);
    createUser(user);
  }, []);

  return (
    <>
      <MySpace />
      <div className="min-h-screen">
        <div className="hero-content">
          <div className="text-center lg:w-1/2 p-6">
            <h1 className="text-3xl font-bold">Active Users</h1>
            <ul className="menu bg-base-200 rounded-box space-y-2">
              {users &&
                users.length > 0 &&
                users.map((user) => (
                  <li key={user.id}>
                    <a>{user.name}</a>
                  </li>
                ))}
            </ul>
          </div>

          <div className="card w-full max-w-md shadow-2xl bg-base-100">
            <h1 className="text-3xl font-bold text-center">To-Do / Schedule</h1>
            <div className="form-control">
              {mockData.map((item) => (
                <label key={item.id} className="label cursor-pointer">
                  <span className="label-text">{item.label}</span>
                  <input
                    type="checkbox"
                    className="checkbox checkbox-primary"
                  />
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
