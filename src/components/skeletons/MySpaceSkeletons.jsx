import React from "react";

const MySpaceTodosSectionSkeleton = () => {
  return (
    <div className="flex flex-col gap-2 w-full">
  {[...Array(3)].map((_, index) => (
    <div key={index} className="flex items-center justify-between mx-2">
      <div className="skeleton h-4 w-3/4"></div>
      <label className="label cursor-pointer">
        <span className="label-text">
          <div className="skeleton h-4 w-full"></div>
        </span>
        <input type="checkbox" className="checkbox checkbox-primary" />
      </label>
    </div>
  ))}
</div>
  );
};

export default MySpaceTodosSectionSkeleton;
