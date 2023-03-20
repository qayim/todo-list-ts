import "./TaskInput.css";
import React, { useRef } from "react";

type TaskEditProps = {
  text: string;
  onUpdateTask: (task: string) => void;
};

const TaskEdit: React.FC<TaskEditProps> = (props) => {
  const taskTextInputRef = useRef<HTMLInputElement>(null);

  const submitHandler = (event: React.FormEvent) => {
    event.preventDefault();
    const enteredTask = taskTextInputRef.current!.value;

    // if (enteredTask?.trim().length === 0) {
    //   props.onUpdateTask(enteredTask);
    //   return;
    // }

    console.log("Input update: " + enteredTask);

    props.onUpdateTask(enteredTask);
  };

  return (
    <div className="todo-input-form">
      <form onSubmit={submitHandler}>
        <p className="todo-input-label">Edit todo</p>
        <div className="grid-container">
          <div></div> {/* dummy div */}
          <input
            className="todo-input"
            type="text"
            ref={taskTextInputRef}
            placeholder={props.text}
          ></input>
          <button className="todo-input-button" type="submit">
            Edit
          </button>
        </div>
      </form>
    </div>
  );
};

export default TaskEdit;
