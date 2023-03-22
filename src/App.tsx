import TaskItem from "./components/TaskItem";
import TaskInput from "./components/TaskInput";
import TaskEdit from "./components/TaskEdit";
import { useEffect, useState } from "react";
import Task from "./models/task";
import "./App.css";

function App() {
  const todos = localStorage.getItem("task")
    ? JSON.parse(localStorage.getItem("task") || "{}")
    : [];

  let itemId: any;

  if (JSON.parse(localStorage.getItem("task") || "{}").length > 0) {
    itemId = JSON.parse(localStorage.getItem("task") || "{}").length + 1;
  } else {
    itemId = 1;
  }

  const [tasks, setTasks] = useState<Task[]>(todos);
  const [tasksUndo, setTasksUndo] = useState<Task[]>([]);
  const [taskId, setTaskId] = useState(itemId);
  const [taskInputVisible, setTaskInputVisible] = useState(false);
  const [taskEditVisible, setTaskEditVisible] = useState(false);
  const [taskUndoVisible, setTaskUndoVisible] = useState(false);
  const [taskEditData, setTaskEditData] = useState("");
  const [taskUpdateData, setTaskUpdateData] = useState("");
  const [taskEditIdData, setTaskEditIdData] = useState(0);

  //CHANGE VISIBILITY STARTS
  //to change visibility of the component
  const taskInputVisibleHandler = () => {
    setTaskInputVisible(!taskInputVisible);
  };

  const taskEditVisibleHandler = () => {
    setTaskEditVisible(!taskEditVisible);
  };
  //CHANGE VISIBILITY ENDS

  //ADD THE NEW DATA STARTS
  const addTaskHandler = (taskText: string) => {
    setTaskId(taskId + 1);
    console.log("Task ID: " + taskId);
    console.log(
      "Todo: " +
        tasks.map(
          (task) =>
            task.text + " ID: " + task.id + " Completion: " + task.complete
        )
    );
    if (taskText?.trim().length === 0) {
      taskInputVisibleHandler();
      return;
    }

    const newTask = new Task(taskText, taskId, false);

    setTasks((prevTask) => {
      return prevTask.concat(newTask);
    });
    console.log("Newly added task: " + tasks.map((task) => task.text));
    //localStorage.setItem("task", JSON.stringify(tasks));
    taskInputVisibleHandler();
  };

  // NOT WORKING
  //save the data every time tasks changes into local storage
  //Problem: every time reloads it, the task value turns into an empty array
  //Potential cause: when reloads tasks data clears(changes) then it reset the tasks to empty again
  //Potential fix: stop the initial reload to trigger the useEffect -> Not sure how, Render state in ref not working
  useEffect(() => {
    localStorage.setItem("task", JSON.stringify(tasks));
  }, [tasks]);

  //ADD THE NEW DATA ENDS

  //REMOVE THE DATA STARTS
  const removeTaskHandler = (taskId: number) => {
    console.log("remove task id: " + taskId);
    setTasksUndo(tasks);
    setTaskUndoVisible(true);
    console.log("tasksUndo", tasksUndo);
    setTasks((prevTask) => {
      return prevTask.filter((task) => task.id !== taskId);
    });
  };
  //REMOVE THE DATA ENDS

  //CHANGE THE COMPLETE STATUS OF THE DATA STARTS
  const completeTaskHandler = (taskId: number) => {
    setTaskUndoVisible(true);
    setTasksUndo(tasks);
    const newTask = tasks.map((task) => {
      // id same then update the data with new data (complete) !task.complete to be safe since only true or false
      if (task.id === taskId) {
        return { ...task, complete: !task.complete };
      }

      // if not the same then just send the before change
      return task;
    });

    setTasks(newTask);
    console.log("Complete id: " + taskId);
    console.log(
      "Todo: " +
        tasks.map(
          (task) =>
            task.text + " ID: " + task.id + " Completion: " + task.complete
        )
    );
  };
  //CHANGE THE COMPLETE STATUS OF THE DATA ENDS

  //EDIT THE DATA STARTS
  //Getting the new edited task text and store it inside taskUpdateData
  //set the taskUpdateData to be used
  const updateTaskHandler = (updatedText: string) => {
    console.log("Edit text: " + updatedText);
    if (updatedText?.trim().length === 0) {
      taskEditVisibleHandler();
      return;
    }
    setTaskUpdateData(updatedText);
    taskEditVisibleHandler();
  };

  //Getting the id of the item we want to edit
  //set the taskEditIdData to be used
  const editTaskHandler = (taskId: number) => {
    setTaskUndoVisible(true);
    console.log("Edit id: " + taskId);
    setTaskEditIdData(taskId);
    tasks.map((task) => {
      if (task.id === taskId) {
        setTaskUpdateData(task.text);
      }
      return task;
    });
    taskEditVisibleHandler();
  };

  //It will update every time taskUpdateData changes
  //takes taskUpdateData and taskEditIdData
  useEffect(() => {
    setTasksUndo(tasks);
    const newTask = tasks.map((task) => {
      // id same then update the data with new data (complete) !task.complete to be safe since only true or false
      if (task.id === taskEditIdData) {
        setTaskEditData(taskUpdateData);
        return { ...task, text: taskUpdateData };
      }

      // if not the same then just send the before change
      return task;
    });
    console.log("taskkk", tasks);
    console.log("Task update data: ", taskUpdateData);
    setTasks(newTask);
    console.log("taskkk after newTask", tasks);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [taskUpdateData]);
  //EDIT THE DATA ENDS

  //UNDO STARTS HERE
  const undoHandler = () => {
    setTasks(tasksUndo);
    setTaskUndoVisible(false);
  };
  //UNDO ENDS HERE

  return (
    <div className="App">
      {taskInputVisible ? (
        <TaskInput onAddTask={addTaskHandler} />
      ) : (
        <div className="task-input-button" onClick={taskInputVisibleHandler}>
          <i
            className="material-icons"
            style={{
              fontSize: "200%",
              color: "#c8e4fa",
              borderStyle: "solid",
              borderColor: "#c8e4fa",
              borderRadius: "10px",
            }}
          >
            add
          </i>
        </div>
      )}
      {taskEditVisible ? (
        <TaskEdit text={taskEditData} onUpdateTask={updateTaskHandler} />
      ) : (
        " "
      )}

      {taskUndoVisible ? (
        <div className="task-input-button" onClick={undoHandler}>
          <i
            className="material-icons"
            style={{
              fontSize: "200%",
              color: "#c8e4fa",
              borderStyle: "solid",
              borderColor: "#c8e4fa",
              borderRadius: "10px",
            }}
          >
            undo
          </i>
        </div>
      ) : (
        ""
      )}

      <TaskItem
        items={tasks}
        onRemoveTask={removeTaskHandler}
        onEditTask={editTaskHandler}
        onCompleteTask={completeTaskHandler}
      />
    </div>
  );
}

export default App;
