import {capsInitials} from "@/utils/helper";
import React, {useRef} from "react";

const PendingTodos = ({data}) => {

  const handleTaskCompletion = (idx, e) => {
    if (e.target.checked) {
      socket.emit("task_completed", {
        user: user,
        index: idx,
        todo: e.target.value,
      });
    }
  };

  {
    data.map((todo, index) => {
      return (
        <>
   
        null
        </>
      );
    });
  }
};

export default PendingTodos;
