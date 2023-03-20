import "./TaskInput.css";
import React, { useRef } from "react";

type TaskInputProps = {
  onAddTask: (text: string) => void;
};

const TaskInput: React.FC<TaskInputProps> = (props) => {
  const taskTextInputRef = useRef<HTMLInputElement>(null);

  const submitHandler = (event: React.FormEvent) => {
    event.preventDefault();
    const enteredText = taskTextInputRef.current!.value;

    // if (enteredText?.trim().length === 0) {
    //     alert("Input cannot be empty");
    //   return;
    // }

    console.log("Input: " + enteredText);

    props.onAddTask(enteredText);
  };
  return (
    <div className="todo-input-form">
      <form onSubmit={submitHandler}>
        <p className="todo-input-label">Todo</p>
        <div className="grid-container">
          <div></div> {/* dummy div */}
          <input
            className="todo-input"
            type="text"
            ref={taskTextInputRef}
          ></input>
          <button className="todo-input-button" type="submit">
            +
          </button>
        </div>
      </form>
    </div>
  );
};

export default TaskInput;
