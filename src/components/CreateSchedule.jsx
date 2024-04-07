import {useState, useRef} from "react";
import {IconPlus, IconTrash, IconPencil} from "@tabler/icons-react";
import useSWR from "swr";
import {createSchedule} from "../utils/helper";
// import {fetcher} from "../utils/helper";

const CreateSchedule = () => {
  const [todos, setTodos] = useState([]);
  const todoRef = useRef(null);
  const [submittingTodos, setSubmittingTodos] = useState(false);

  //   const {data, error, isLoading} = useSWR(
  //     "http://localhost:8000/api/v1/todos",
  //     fetcher
  //   );

  const [editingTodo, setEditingTodo] = useState({
    id: null, // Store the todo index for editing
    value: "", // Store the edited value
  });

  const addTodo = () => {
    const newTodo = todoRef.current.value;
    setTodos((prevTodo) => [...prevTodo, newTodo]);
    todoRef.current.value = "";
  };
  const deleteTodo = (idx) => {
    const newTodos = [...todos];
    newTodos.splice(idx, 1);
    setTodos(newTodos);
    setEditingTodo({
      id: null,
      value: "",
    }); ///reset state on delete to maintain consistency
  };

  //pencilIcon-> editTodo-> setEditingTodo({id:idx, value:todos[idx]})
  const editTodo = (idx) => {
    setEditingTodo({
      id: idx,
      value: todos[idx], //sets the current todo to editing todo state
    });
  };

  //get the current todos set em to a array, get the previous todos and update the value with the curr e val
  //setEditingTodo((prev)=>({..prev, value:e.target.value}))
  const handleEditChange = (e) => {
    setEditingTodo((prev) => ({...prev, value: e.target.value}));
  };
  //when editing completes on pressing the enter key you do
  //first you destructre the id
  //if the id is not null, implying that todo has been edited
  //take all the todos , copy deep copy them to an array
  //update the todos array with the value and the setthetodos with the updated todos
  //reset the editingTodo state to null and empty
  const handleEditComplete = () => {
    const {id, value} = editingTodo;
    if (id != null) {
      const updatedTodos = [...todos];
      //since id has nothignn but the index
      updatedTodos[id] = value;
      setTodos(updatedTodos);
    }
    //similiar to resting a flag
    setEditingTodo({id: null, value: ""});
  };

  const handleSubmitTodo = async () => {
    setSubmittingTodos(true);
    const data = {
      label: todos,
    };
    console.log("----", data);
    if (todos && todos.length > 0) {
      const response = await createSchedule(data);
      setTodos([]);
      if (response.ok) {
        setSubmittingTodos(false);
        document.getElementById("my_modal_2").close();
      }
    }
  };

  return (
    <>
      <dialog id="my_modal_2" className="modal">
        <div className="modal-box  flex-col gap-2 overflow-hidden">
          <label className="input input-bordered flex items-center gap-2">
            <input
              type="text"
              className="grow text-xl"
              placeholder="Add a todo here"
              ref={todoRef}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  addTodo();
                }
              }}
            />
            <IconPlus onClick={addTodo} />
          </label>
          {todos.length === 0 && (
            <div className="flex items-center flex-center m-6">
              {submittingTodos ? (
                <span className="loading loading-spinner"></span>
              ) : (
                <img
                  src={"images/empty_list2.png"}
                  alt="Empty todo list"
                  className="rounded-lg "
                />
              )}
            </div>
          )}
          {todos.length > 0 &&
            todos?.map((todo, index) => {
              return (
                <div
                  className="flex-col items-between justify-center m-4"
                  key={index}>
                  <div className="flex items-center justify-between">
                    {editingTodo.id === index ? (
                      <label className="input input-bordered flex items-center gap-2">
                        <input
                          type="text"
                          className="grow text-xl"
                          placeholder="Edit todo"
                          onChange={(e) => handleEditChange(e)}
                          onKeyDown={(e) => {
                            if (e.key == "Enter") {
                              handleEditComplete();
                            }
                          }}
                          onBlur={handleEditComplete}
                        />
                      </label>
                    ) : (
                      <p className="text-xl text-slate-200">
                        {todo
                          .split(" ")
                          .map(
                            (item) =>
                              item.charAt(0).toUpperCase() + item.substring(1)
                          )
                          .join(" ")}
                      </p>
                    )}

                    <div className="flex gap-2">
                      <button
                        className="btn btn-sm btn-accent"
                        onClick={() => {
                          editTodo(index);
                        }}>
                        <IconPencil />
                      </button>
                      <button
                        className="btn btn-sm btn-error"
                        onClick={() => deleteTodo(index)}>
                        <IconTrash />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          <button
            className={`btn mt-2 ${
              submittingTodos ? `btn-accent` : `btn-default`
            }  text-lg rounded-full ${
              submittingTodos ? `cursor-not-allowed` : `cursor-pointer`
            }`}
            onClick={() => {
              handleSubmitTodo();
            }}>
            Ready to have a productive day?
          </button>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </>
  );
};

export default CreateSchedule;
