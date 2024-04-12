import React, {useEffect} from "react";
import Button from "./button";
import {useAuth0} from "@auth0/auth0-react";
import axios from "axios";
import {socket} from "@/socket";

const Header = () => {
  const {
    loginWithRedirect,
    logout,
    isAuthenticated,
    isLoading,
    user,
    getAccessTokenSilently,
  } = useAuth0();

  const allUsers = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/users`);
      return response.data;
    } catch (error) {
      console.log("error", error.message);
    }
  };
  const allTodos = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/todos`);
      return response.data;
    } catch (error) {
      console.log("error", error.message);
    }
  };

  return (
    <div className="navbar bg-neutral-500 shadow-xl">
      {/*<Button />*/}
      <div className="gap-2">
       

        <div className="dropdown dropdown-end ">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar indicator">
            <div className="w-14 rounded-full  ">
              <img
                alt="Tailwind CSS Navbar component"
                src={
                  user
                    ? user.picture
                    : "https://img.freepik.com/premium-photo/cartoon-game-avatar-logo-gaming-brand_902820-465.jpg"
                }
              />
            </div>

            {isAuthenticated && (
              <span className="indicator-item indicator-bottom badge badge-success" />
            )}
          </div>

        </div>
      </div>
      <div className="flex flex-grow justify-center">
        <a className="btn text-2xl btn-neutral text-white dark:text-sky-400">SCHEDULER APP</a>
      </div>
      <div className="flex gap-5">
      {isAuthenticated ? (
        <button
          className="btn btn-neutral"
          onClick={() => {
            socket.emit("logout_triggered", user);
            logout({logoutParams: {returnTo: window.location.origin}});
          }}>
          Logout
        </button>
      ) : (
        <button
          className="btn btn-neutral text-white"
          onClick={() => {
            loginWithRedirect();
          }}>
          Login
        </button>
      )}
    </div>
    </div>
  );
};

export default Header;
