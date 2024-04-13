import React from "react";
import { Card } from "./card";

const NoActiveUsersFound = () => {
  return (
    <Card
      className={"shadow-xl bg-slate-300 dark:bg-base-400 rounded-lg h-3/4"}>
      <div className="flex flex-col items-center justify-center h-3/4">
        <h1 className="mt-6 text-2xl font-bold tracking-tight  sm:text-4xl">
          Uh-oh! No Active Users found
        </h1>
        <img
          src={"/images/404-users.png"}
          alt="users-not-found"
          className="rounded-lg w-3/4 mt-2"
        />
      </div>
    </Card>
  );
};

export default NoActiveUsersFound;
