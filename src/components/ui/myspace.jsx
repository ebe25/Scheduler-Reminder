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

  const [checked, setChecked] = useState(false);
  const audioRef = useRef(null);
  const scheduleRef = useRef(null);
  //refac later
  const [completedTasksOfDay, setcompletedTasksOfDay] = useState(false);

  useEffect(() => {
    // console.log("resfasdklfhjsf", );
    if (scheduleRef &&  scheduleRef?.current?.checked) {
      setcompletedTasksOfDay(true);
    }

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

  if (error) return <Error />;

  const handleTaskCompletion = (idx, e) => {
    if (e.target.checked) {
      socket.emit("task_completed", {
        user: user,
        index: idx,
        todo: e.target.value,
      });
      // mutate(`${BASE_URL}/users`);
    }
  };
  return (
    <>
      <div className="hero bg-base-200">
        <div className="hero-content flex-col lg:flex-row-reverse min-h-screen">
          <div className="card w-full md:w-3/6 shadow-xl bg-base-300 min-h-[200px]">
            {/* checkboxes */}

            <h1 className="text-xl md:text-3xl font-bold text-center text-white mb-2 md:mb-4">
              {"Schedule".toUpperCase()}
            </h1>
            {completedTasksOfDay ? (
              <EmptyList />
            ) : !data ? (
              <MySpaceTodosSectionSkeleton />
            ) : !user ? (
              //add a gif component that shows user to add todos
              <EmptyList />
            ) : (
              data.data &&
              data?.data
                .filter((dbUser) => {
                  if (dbUser?.name === user?.name) {
                    return dbUser;
                  }
                })
                .map((dbUser, index) => {
                  return dbUser.todos?.length === 0 ? (
                    <EmptyList key={index} />
                  ) : (
                    dbUser?.todos?.map((todo, index) => (
                      <label
                        className={`label cursor-pointer ${
                          todo.status === "COMPLETED" ? "hidden" : "visible"
                        }`}
                        key={index}>
                        <div className={"flex items-center gap-8 flex-grow"}>
                          <input
                            type="checkbox"
                            checked={todo.status === "COMPLETED" ? true : false}
                            className={`checkbox checkbox-accent `}
                            onChange={(e) => {
                              handleTaskCompletion(index, e);
                              audioRef.current.play();
                            }}
                            value={todo.title}
                            ref={scheduleRef}
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
          <div className="hero-content flex-col items-start md:items-start md:justify-start whitespace-wrap ">
            <h1 className="text-5xl text-white font-bold text-center md:text-left">
              My Space
            </h1>
            <p className="md:w-full text-white">
              Welcome to the scheduler app. Use the button below to plan out
              your day and see what your friends are up to!
            </p>
            <button
              className={`btn ${user ? "btn-accent" : "btn-accent"} ${
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
