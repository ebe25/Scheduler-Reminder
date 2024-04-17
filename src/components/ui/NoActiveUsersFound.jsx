import React from "react";
import { Card } from "./card";

const NoActiveUsersFound = () => {
  return (
    // <Card
    //   className={"shadow-xl bg-base-300 dark:bg-base-400 rounded-lg h-full border-none"}>
      <div className="flex flex-col md:flex-row items-center justify-center md:gap-6">
        <h1 className="mt-6 text-lg font-bold  sm:text-4xl text-white">
          Uh-oh! No Active Users found
        </h1>
        <img
          src={"/images/404-users.png"}
          alt="users-not-found"
          className="rounded-lg w-full md:w-1/2 mt-2"
        />
      </div>
    // </Card>
  );
};

export default NoActiveUsersFound;
