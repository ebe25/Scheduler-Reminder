import React from "react";
import mockData from "./mockdata";

const TaskList = ({tasksList}) => {
  return (
    <div className="card w-full max-w-md shadow-2xl bg-base-100">
      <h1 className="text-3xl font-bold text-center">To-Do / Schedule</h1>
      <div className="form-control">
        {tasksList.map((item) => (
          <label key={item.id} className="label cursor-pointer">
            <span className="label-text">{item.label}</span>
            <input type="checkbox" className="checkbox checkbox-primary" />
          </label>
        ))}
      </div>
    </div>
  );
};

export default TaskList;
