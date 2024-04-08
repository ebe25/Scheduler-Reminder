import React from "react";

const LoginPromptModal = () => {
  return (
    <dialog id="my_modal_1" className="modal">
      <div className="modal-box bg-gray-200  rounded-lg mx-4 p-6">
        <h3 className="font-bold  text-2xl text-red-500">Authentication Required!!</h3>
        <p className="py-4 text-xl text-gray-700">
          Please log in to continue interacting with this feature.
        </p>
       
      </div>
    </dialog>
  );
};

export default LoginPromptModal;
