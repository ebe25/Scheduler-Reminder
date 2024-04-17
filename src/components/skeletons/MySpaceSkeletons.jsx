import React from "react";

const MySpaceTodosSectionSkeleton = () => {
  return (
    <div className="flex flex-col gap-2 w-full">
  {[...Array(3)].map((_, index) => (
    <div key={index} className="flex items-center justify-around mx-2">
    <label className="label cursor-pointer">
      <input type="checkbox" className="checkbox  checkbox-accent" />
    </label>
      <div className="skeleton h-4 w-3/4"></div>
    </div>
  ))}
</div>
  );
};

export default MySpaceTodosSectionSkeleton;
