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

      <div className="gap-2 ">
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
      <div className="flex w-full justify-center">
        <a className="btn text-2xl btn-neutral text-white dark:text-sky-400">
          SCHEDULER APP
        </a>
      </div>
      <div className="flex gap-5 ">
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
      {/* <label className="btn btn-circle swap swap-rotate btn-accent xs:visible md:invisible flex-none">
        <input type="checkbox" />

        <svg
          className="swap-off fill-current"
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          viewBox="0 0 512 512">
          <path d="M64,384H448V341.33H64Zm0-106.67H448V234.67H64ZM64,128v42.67H448V128Z" />
        </svg>

        <svg
          className="swap-on fill-current"
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          viewBox="0 0 512 512">
          <polygon points="400 145.49 366.51 112 256 222.51 145.49 112 112 145.49 222.51 256 112 366.51 145.49 400 256 289.49 366.51 400 400 366.51 289.49 256 400 145.49" />
        </svg>
      </label> */}
    </div>
  );
};

export default Header;
