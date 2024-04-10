import React, {useEffect, useState} from "react";
import {ToastContainer, toast} from "react-toastify";
import MySpace from "./ui/myspace";
import {useAuth0} from "@auth0/auth0-react";
import "react-toastify/dist/ReactToastify.css";
import ActiveUsersTab from "./ui/TabList";

const Home = ({socket}) => {
  const {getAccessTokenSilently, isLoading, user, isAuthenticated} = useAuth0();
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
      socket.emit("login_completed", {
        name: user.name,
        email: user.email,
        picture: user.picture,
      });
      socket.emit("connection_made", user);
    }
  }, [isLoading]);

  useEffect(() => {
    socket.on("active_users", (activeUsersServer) => {
      console.log("socket received active users event", activeUsersServer);
      setActiveUsers(activeUsersServer);
    });

    window.addEventListener("beforeunload", () => {
      socket.emit("custom_dc", user);
    });

    // Cleanup
    return () => {
      window.removeEventListener("beforeunload", () => {
        socket.emit("custom_dc", user);
      });
    };
  }, [user, socket]);

  useEffect(() => {
    if (user) {
      // Displaying a toast message when a user logs in
      toast(`${user.name} has joined the party`, {
        position: "top-right",
        autoClose: 500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
      });
    }
  }, [isLoading]);


  return (
    <>
      <MySpace />
      <div className="min-h-screen">
        <div className="hero-content flex justify-center items-center ">
          <div className="text-center lg:w-1/2 p-6">
            <h1 className="text-3xl font-bold">Active Users</h1>
            {activeUsers && activeUsers.length > 0 ? (
              <div className="mt-6">
                <ActiveUsersTab activeUsersData={activeUsers} />
              </div>
            ) : (
              <p>No active friends found</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
