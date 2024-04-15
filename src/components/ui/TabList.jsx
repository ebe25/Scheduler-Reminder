import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { capsInitials, fetcher } from "@/utils/helper";
import EmptyList from "./EmptyList";
import useSWR from "swr";
import { BASE_URL } from "../../utils/api-config";
import MySpaceTodosSectionSkeleton from "../skeletons/MySpaceSkeletons";
import { Card } from "./card";
import { useAuth0 } from "@auth0/auth0-react";
import NoActiveUsersFound from "./NoActiveUsersFound";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"



const ActiveUsersTab = ({ activeUsersData }) => {
  const [tabName, setTabName] = useState(activeUsersData[0].name);
  const { data, error, isLoading } = useSWR(`${BASE_URL}/users`, fetcher);
  const { user } = useAuth0();

  if (isLoading) {
    return <MySpaceTodosSectionSkeleton />;
  }

  // Filter out the current user from active users list
  const activeUsersExcepttheCurrentUser = activeUsersData?.filter((dbuser) => dbuser?.name !== user?.name);

  // Fetch todos of the selected user
  const selectedUser = data?.data.find((user) => user.name === tabName);
  const selectedUserTodos = selectedUser?.todos;
  console.log("---", activeUsersExcepttheCurrentUser[0].name)

  return (
    <Tabs className="flex flex-col md:flex-row items-start justify-start md:items-center md:justify-center gap-lg h-1/2 md:h-full md:w-[1250px] " defaultValue={activeUsersExcepttheCurrentUser[0].name}>
      {/* Active Users List */}
      <div className="md:w-1/2 lg:w-3/4 h-full min-h-screen w-full">
        <Card className="shadow-xl bg-base-200 rounded-lg h-full border border-bg-base-200">
          <h1 className="text-3xl font-bold text-white mb-2">Active Users</h1>
          <TabsList className="flex flex-col h-full">
            {activeUsersExcepttheCurrentUser.length > 0 ? (
              activeUsersExcepttheCurrentUser.map((user) => (
                <TabsTrigger key={user.id} value={user.name} onClick={() => setTabName(user.name)}>
                  <div className={`menu-item bg-zinc-200 dark:bg-base-400 rounded-box space-y-4 mt-2 p-4 border border-black cursor-pointer flex items-center justify-between`}>
                    <span className="text-black text-lg">{user.name}</span>
                    <img className="h-8 w-8 rounded-full ring-2 ring-white" src={user.picture} alt={user.name} />
                  </div>
                </TabsTrigger>
              ))
            ) : (
              <NoActiveUsersFound />
            )}
          </TabsList>
        </Card>
      </div>

      {/* User Activity */}
      <div className="md:w-2/3 lg:w-3/4 w-full min-h-screen">
        <Card className="shadow-xl bg-base-200 rounded-lg ">
          <h1 className="text-3xl font-bold text-white mb-2">User Activity</h1>
          <TabsContent value={tabName} className="h-full">
            {selectedUserTodos?.length > 0 ? (
              <div className=" w-full h-full gap-4 shadow-2xl p-4">
                {selectedUserTodos.map((todo, index) => (
                  <div className=" card  sm:p-2" key={index}>
                    <label className="label text-2xl cursor-pointer justify-center gap-4 w-full">
                      <input type="checkbox" disabled={true} checked={todo.status === "COMPLETED"} className="checkbox checkbox-accent" />
                      <span className="label-text  text-white text-xl">{capsInitials(todo?.title)}</span>
                    </label>
                  </div>
                ))}
              </div>
            ) : (
              <EmptyList />
            )}
          </TabsContent>
        </Card>
      </div>
    </Tabs>






  );
};

export default ActiveUsersTab;
