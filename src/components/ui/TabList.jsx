import React, {useState} from "react";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import {capsInitials, fetcher} from "@/utils/helper";
import EmptyList from "./EmptyList";
import useSWR from "swr";
import {BASE_URL} from "../../utils/api-config";
import MySpaceTodosSectionSkeleton from "../skeletons/MySpaceSkeletons";

const ActiveUsersTab = ({activeUsersData}) => {
  const [tabName, setTabName] = useState(activeUsersData[0]?.name);
  const {data, error, isLoading} = useSWR(`${BASE_URL}/users`, fetcher);

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
      <TabsList className="flex-col h-full">
        {activeUsersData.map((user) => {
          return (
            <TabsTrigger value={user?.name} key={user.id}>
              <ul
                className="menu bg-base-200 rounded-box space-y-4 w-full mt-2"
                onClick={() => setTabName(user?.name)}>
                <li key={user.id}>
                  <span className="text-green-400 flex justify-between">
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
      <TabsContent value={tabName} className={"w-full h-full"}>
        {selectedUserTodos.length > 0 ? (
          <div className="card  w-full  h-full gap-4 lg:flex-col shadow-2xl bg-slate-700/50  p-4">
            {selectedUserTodos?.map((todo, index) => (
              <div
                className=" flex-grow card bg-base-300 p-4 sm:p-2"
                key={index}>
                <label className="label cursor-pointer ">
                  <span className="label-text text-xl text-neutral-100 ">
                    {capsInitials(todo)}
                  </span>
                  <input type="checkbox" className="checkbox checkbox-info" />
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


