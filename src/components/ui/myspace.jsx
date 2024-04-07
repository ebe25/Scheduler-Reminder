import CreateSchedule from "../CreateSchedule";
import useSWR from "swr";
import {BASE_URL} from "../../utils/api-config";
import {fetcher, capsInitials} from "../../utils/helper";
import MySpaceTodosSectionSkeleton from "../skeletons/MySpaceSkeletons";

const MySpace = () => {
  const {data, error, isLoading} = useSWR(`${BASE_URL}/users`, fetcher);
  if (error) return <div>failed to load</div>;
  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="card w-full max-w-lg shadow-2xl bg-base-100">
          <h1 className="text-3xl font-bold text-center">To-Do / Schedule</h1>
          {/* checkboxes */}
          <div className="form-control p-2 m-2">
            {!data ? (
              <MySpaceTodosSectionSkeleton />
            ) : (
              data.data[0].todos.map((item, index) => (
                <label key={index} className="label cursor-pointer">
                  <span className="label-text text-3xl">{capsInitials(item)}</span>
                  <input
                    type="checkbox"
                    className="checkbox checkbox-primary"
                  />
                </label>
              ))
            )}
          </div>
        </div>
        <div>
          <h1 className="text-5xl font-bold">My Space</h1>
          <p className="py-6">
            Welcome to the scheduler app. Use the button below to plan out your
            day and see what your friends are up to!
          </p>
          <button
            className="btn btn-primary"
            onClick={() => document.getElementById("my_modal_2").showModal()}>
            Create Schedule
          </button>
          <CreateSchedule />
        </div>
      </div>
    </div>
    // <Profile/>
  );
};

export default MySpace;
