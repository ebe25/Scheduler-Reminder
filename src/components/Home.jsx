import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import mockData from "./ui/mockdata";
import MySpace from "./ui/myspace";
import { useAuth0 } from "@auth0/auth0-react";
import "react-toastify/dist/ReactToastify.css";

const Home = ({ socket }) => {
  const { getAccessTokenSilently, isLoading, user, isAuthenticated } = useAuth0();
  const [activeUsers, setActiveUsers] = useState([]);
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

      // Displaying a toast message when a user logs in
      toast(`${user.name} has joined the party`, {
        position: "top-right",
        autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      });
    }
  }, [isLoading]);

  useEffect(() => {
    socket.on("active_users", (activeUsersServer) => {
      console.log("socket recivied active users event", activeUsersServer);
      setActiveUsers(activeUsersServer)
    })
    return () => {
      setActiveUsers(null)
    }
    
  }, []);
  return (
    <>
      <MySpace />
      <div className="min-h-screen">
        <div className="hero-content ">
          <div className="text-center lg:w-1/2 p-6">
            <h1 className="text-3xl font-bold">Active Friends</h1>
            {activeUsers && activeUsers.length >0 ? (activeUsers.map((user) => (
              <ul className="menu bg-base-200 rounded-box space-y-2 w-3/4">
                <li key={user.id} >
                 
                  <span className="text-green-400 flex justify-between">{user.name} <img className="h-8 w-8 rounded-full ring-2 ring-white" src={user.picture}  alt={user.name} /></span>
                </li>
              </ul>
            ))) : (<p>No active friends found</p>)}

          </div>

          {/* <div className="card w-full max-w-md shadow-2xl bg-base-100">
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
          </div> */}
        </div>
      </div>
    </>
  );
};

export default Home;
