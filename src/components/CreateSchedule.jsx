import { useState, useRef } from "react";
import { IconPlus, IconTrash, IconPencil } from "@tabler/icons-react";
const CreateSchedule = () => {
    const [todos, setTodos] = useState([]);
    const todoRef = useRef(null);

    const [editingTodo, setEditingTodo] = useState({
        id: null, // Store the todo index for editing
        value: "", // Store the edited value
    });

    const addTodo = () => {
        const newTodo = todoRef.current.value;
        setTodos((prevTodo) => [...prevTodo, newTodo]);
        todoRef.current.value = "";
    }
    const deleteTodo = (idx) => {
        const newTodos = [...todos];
        newTodos.splice(idx, 1);
        setTodos(newTodos);
        setEditingTodo({
            id: null,
            value: ""
        })                        ///reset state on delete to maintain consistency
    }

    const editTodo = (idx) => {
        setEditingTodo({
            id: idx,
            value: todos[idx], //sets the current todo to editing todo state
        })
    }
    const handleEditChange = (e) => {
        setEditingTodo((prev) => ({ ...prev, value: e.target.value }))
    }

    const handleEditComplete = () => {
        const { id, value } = editingTodo;
        if (id != null) {
            const updatedTodos = [...todos];
            //since id has nothignn but the index
            updatedTodos[id] = value;
            setTodos(updatedTodos);
        }
        //similiar to resting a flag
        setEditingTodo({ id: null, value: "" });
    }


    return (
        <>
            <dialog id="my_modal_2" className="modal">
                <div className="modal-box  flex-col gap-2">
                    <label className="input input-bordered flex items-center gap-2">
                        <input type="text" className="grow text-xl" placeholder="Add a todo here" ref={todoRef} onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                addTodo()
                            }
                        }} />
                        <IconPlus onClick={addTodo} />
                    </label>
                    {todos.length === 0 &&
                        <div className="flex items-center flex-center m-6">
                            <img src={"images/empty_list2.png"
                            } alt='Empty todo list' className="rounded-lg " />
                        </div>}
                    {todos.length > 0 && todos?.map((todo, index) => {
                        return (
                            <div className="flex-col items-between justify-center m-4" key={index}>
                                <div className="flex items-center justify-between">
                                    {
                                        editingTodo.id === index ? (
                                            <label className="input input-bordered flex items-center gap-2">
                                                <input type="text" className="grow text-xl" placeholder="Edit todo"
                                                    onChange={(e) => handleEditChange(e)} onKeyDown={(e) => {
                                                        if (e.key == "Enter") {
                                                            handleEditComplete()
                                                        }
                                                    }}
                                                    onBlur={handleEditComplete}
                                                />
                                            </label>
                                        ) :
                                            (
                                                <p className="text-xl text-slate-200">{todo.split(" ").map((item) => item.charAt(0).toUpperCase() + item.substring(1)).join(" ")}</p>
                                            )

                                    }




                                    <div className="flex gap-2">
                                        <button className="btn btn-sm btn-error" onClick={() => {
                                            editTodo(index);
                                        }}>
                                            <IconPencil />
                                        </button>
                                        <button className="btn btn-sm btn-accent" onClick={() => deleteTodo(index)}>
                                            <IconTrash />
                                        </button>
                                    </div>

                                </div>
                            </div>
                        )
                    })}

                </div>
                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog >
        </>
    );
};

export default CreateSchedule;
