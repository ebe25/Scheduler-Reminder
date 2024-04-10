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
    <div className="navbar bg-base-100">
      <Button />

      <div className="flex flex-grow justify-center">
        <a className="btn text-xl">SCHEDULER APP</a>
      </div>

      <div className="gap-6">
        <div className="flex gap-5">
          {isAuthenticated ? (
            <button
              className="btn"
              onClick={() => {
                socket.emit("logout_triggered", user);
                logout({logoutParams: {returnTo: window.location.origin}});
              }}>
              Logout
            </button>
          ) : (
            <button
              className="btn btn-primary"
              onClick={() => {
                loginWithRedirect();
              }}>
              Login
            </button>
          )}
        </div>

        <div className="dropdown dropdown-end ">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar indicator">
            <div className="w-12 rounded-full  ">
              <img
                alt="Tailwind CSS Navbar component"
                src={
                  user
                    ? user.picture
                    : "https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                }
              />
            </div>

            {isAuthenticated && (
              <span className="indicator-item indicator-bottom badge badge-success badge-sm" />
            )}
          </div>
          <ul
            tabIndex={0}
            className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
            <li>
              <a className="justify-between">Profile</a>
            </li>
            <li>
              <a>Logout</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Header;
