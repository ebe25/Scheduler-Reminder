import CreateSchedule from "../CreateSchedule";
import useSWR from "swr";
import {BASE_URL} from "../../utils/api-config";
import {fetcher, capsInitials} from "../../utils/helper";
import MySpaceTodosSectionSkeleton from "../skeletons/MySpaceSkeletons";
import {useAuth0} from "@auth0/auth0-react";
import EmptyList from "./EmptyList";
import LoginPromptModal from "./Modal";
import {socket} from "@/socket";
import {useEffect, useRef, useState} from "react";
import {ToastContainer, toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {mutate} from "swr";
import Error from "./Error";
const MySpace = () => {
  const {data, error, isLoading} = useSWR(`${BASE_URL}/users`, fetcher);
  const {user, isAuthenticated} = useAuth0();
  const audioRef = useRef(null);

  useEffect(() => {
    socket.on("notify", ({label, username}) => {
      toast(`${username} completed ${label}`, {
        position: "top-left",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
      });
      mutate(`${BASE_URL}/users`);
    });
    return () => {};
  }, []);

  if (error) return <Error/>;

  const handleTaskCompletion = (idx, e) => {
    if (e.target.checked) {
      socket.emit("task_completed", {
        user: user,
        index: idx,
        todo: e.target.value,
      });
    }
  };
  return (
    <>
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="card w-3/6 shadow-2xl bg-base-100">
            <h1 className="text-3xl font-bold text-center">To-Do / Schedule</h1>
            {/* checkboxes */}
            <div className="form-control p-2 m-2">
              {!data ? (
                <MySpaceTodosSectionSkeleton />
              ) : !user ? (
                <MySpaceTodosSectionSkeleton />
              ) : (
                data.data &&
                data.data
                  .filter((dbUser) => {
                    if (dbUser.name === user.name) {
                      return dbUser;
                    }
                  })
                  .map((dbUser, index) => {
                    return dbUser.todos?.length === 0 ? (
                      <EmptyList key={index} />
                    ) : (
                      dbUser.todos?.map((todo, index) => (
                        <label className="label cursor-pointer " key={index}>
                          <div className="flex items-center gap-8 flex-grow">
                            <input
                              key={index}
                              type="checkbox"
                              checked={
                                todo.status === "COMPLETED" ? true : false
                              }
                              className="checkbox checkbox-accent"
                              onChange={(e) => {
                                handleTaskCompletion(index, e);
                                audioRef.current.play();
                              }}
                              value={todo.title}
                            />
                         
                            <span className="label-text text-3xl ">
                              {capsInitials(todo.title)}
                            </span>
                          </div>
                        </label>
                      ))
                    );
                  })
              )}
            </div>
          </div>
          <div>
            <h1 className="text-5xl font-bold">My Space</h1>
            <p className="py-6">
              Welcome to the scheduler app. Use the button below to plan out
              your day and see what your friends are up to!
            </p>
            <button
              className={`btn ${user ? "btn-primary" : "btn-default"} ${
                user ? "cursor-pointer" : "cursor-not-allowed"
              }`}
              // disabled={user ? false : true}
              onClick={() => {
                document
                  .getElementById(user ? "my_modal_2" : "my_modal_1")
                  .showModal();
              }}>
              Create Schedule
            </button>
            <CreateSchedule />
            <LoginPromptModal />
          </div>
        </div>
      </div>
      <audio ref={audioRef}>
        <source src="/ping-82822.mp3" type="audio/mp3" />
      </audio>
    </>
    // <Profile/>
  );
};

export default MySpace;
