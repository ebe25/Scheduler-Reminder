import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { capsInitials, fetcher } from "@/utils/helper";
import EmptyList from "./EmptyList";
import useSWR from "swr";
import { BASE_URL } from "../../utils/api-config";
import MySpaceTodosSectionSkeleton from "../skeletons/MySpaceSkeletons";
import { Card } from "./card";


const ActiveUsersTab = ({ activeUsersData }) => {
  const [tabName, setTabName] = useState(activeUsersData[0]?.name);
  const { data, error, isLoading } = useSWR(`${BASE_URL}/users`, fetcher);

  if (isLoading) {
    return <MySpaceTodosSectionSkeleton />;
  }

  //selectedUserTodos - >using tabname
  const usersDataByPoll = data?.data;
  const selectedUser = usersDataByPoll?.find((user) => user.name === tabName);
  const selectedUserTodos = selectedUser?.todos;

  return (
    <Tabs
      defaultValue={activeUsersData[0]?.name}
      className="w-full flex  gap-6 h-3/4 ">
      <Card className={"shadow-xl bg-slate-300 dark:bg-base-400 rounded-lg h-3/4"}>
        <TabsList className="flex-col h-full flex-grow">
          {activeUsersData.map((user) => {
            return (
              <TabsTrigger value={user?.name} key={user.id}>
                <ul
                  className="menu bg-gray-200 dark:bg-base-400 rounded-box space-y-4 w-full mt-2"
                  onClick={() => setTabName(user?.name)}>
                  <li key={user.id}>
                    <span className="text-black-500 text-lg flex justify-between">
                      {user?.name}{" "}
                      <img
                        className="h-8 w-8 rounded-full ring-2 ring-white"
                        src={user?.picture}
                        alt={user?.name}
                      />
                    </span>
                  </li>
                </ul>
              </TabsTrigger>
            );
          })}
        </TabsList>
      </Card>

      <TabsContent value={tabName} className={"w-full h-full"}>
        {selectedUserTodos?.length > 0 ? (
          <div className="card dark:bg-base-500 w-full  h-full gap-4 lg:flex-col shadow-2xl   p-4">
            {selectedUserTodos?.map((todo, index) => (
              <div
                className=" flex-grow card bg-base-300 p-4 sm:p-2"
                key={index}>
                <label className="label cursor-pointer ">
                  <span className="label-text text-xl  ">
                    {capsInitials(todo.title)}
                  </span>
                  <input type="checkbox" disabled={true} checked={todo.status === "COMPLETED" ? true : false} className="checkbox checkbox-info" />
                </label>
                <div className="divider lg:divider-horizontal"></div>
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
