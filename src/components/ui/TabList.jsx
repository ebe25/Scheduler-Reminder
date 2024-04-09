import React, {useState} from "react";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import {capsInitials, fetcher} from "@/utils/helper";
import EmptyList from "./EmptyList";
import useSWR from "swr";
import {BASE_URL} from "../../utils/api-config";

const ActiveUsersTab = ({activeUsersData}) => {
  const [tabName, setTabName] = useState(activeUsersData[0]?.name);
  const {data, error, isLoading} = useSWR(`${BASE_URL}/users`, fetcher);

  if (isLoading) {
    return <span className="loading loading-infinity loading-lg text-warning"></span>;
  }

  //selectedUserTodos - >using tabname
  const usersDataByPoll = data?.data;
  const selectedUser = usersDataByPoll.find((user) => user.name === tabName);
  const selectedUserTodos = selectedUser.todos;

  return (
    <Tabs
      defaultValue={activeUsersData[0]?.name}
      className="w-full flex gap-6 h-3/4 ">
      <TabsList className="flex-col h-full">
        {activeUsersData.map((user) => {
          return (
            <TabsTrigger value={user.name} key={user.id}>
              <ul
                className="menu bg-base-200 rounded-box space-y-4 w-full mt-2"
                onClick={() => setTabName(user.name)}>
                <li key={user.id}>
                  <span className="text-green-400 flex justify-between">
                    {user.name}{" "}
                    <img
                      className="h-8 w-8 rounded-full ring-2 ring-white"
                      src={user.picture}
                      alt={user.name}
                    />
                  </span>
                </li>
              </ul>
            </TabsTrigger>
          );
        })}
      </TabsList>
      <TabsContent value={tabName} className={"w-full h-full"}>
        {selectedUserTodos.length > 0 ? (
          <div className="card  w-full rounded-lg bg-base-400 glass shadow-xl">
            {selectedUserTodos.map((todo, index) => (
              <div className="card-body" key={index}>
                <label className="label cursor-pointer ">
                  <span className="label-text text-xl text-neutral-200">
                    {capsInitials(todo)}
                  </span>
                  <input
                    type="checkbox"
                    className="checkbox checkbox-primary"
                  />
                </label>
              </div>
            ))}
          </div>
        ) : (
          <EmptyList />
        )}
      </TabsContent>
    </Tabs>
  );
};

export default ActiveUsersTab;
