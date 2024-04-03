import React, { useEffect, useState } from "react";
import mockData from "./ui/mockdata";
import MySpace from "./ui/myspace";
import { useAuth0 } from "@auth0/auth0-react";
import useFetchUsers from "../utils/useFetchUsers";
import { BASE_URL } from "../utils/api-config";

const Home = ({ socket }) => {
  // const { users, isUserLoading } = useFetchUsers(BASE_URL);
  const { getAccessTokenSilently, isLoading, user, isAuthenticated } = useAuth0();
  const [activeUsers, setActiveUsers] = useState(null);
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
    if (isAuthenticated && user) {
      socket.emit("login", {
        name: user.name,
        email: user.email,
        picture: user.picture,
      });
    }

  }, [isLoading]);

  useEffect(() => {
    socket.on("active_users", (activeUsersServer) => {
      console.log("socket recivied acitve users event", activeUsersServer);
      setActiveUsers(activeUsersServer)
      return () => {
        setActiveUsers(null)
      }

    })
  }, []);
  return (
    <>
      <MySpace />
      <div className="min-h-screen">
        <div className="hero-content">
          <div className="text-center lg:w-1/2 p-6">
            <h1 className="text-3xl font-bold">Active Users</h1>

            {isUserLoading ? (
              <h2 className="text-2xl font bold">Loading...</h2>
            ) : users.length > 0 ? (
              <ul className="menu bg-base-200 rounded-box space-y-2">
                {activeUsers?.map((user) => (
                  <li key={user.id}>
                    <p className="text-green-400">{user}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No active users found.</p>)
            }
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
