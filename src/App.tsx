import TaskItem from "./components/TaskItem";
import TaskInput from "./components/TaskInput";
import TaskEdit from "./components/TaskEdit";
import { useEffect, useState } from "react";
import Task from "./models/task";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [taskId, setTaskId] = useState(0);
  const [taskInputVisible, setTaskInputVisible] = useState(false);
  const [taskEditVisible, setTaskEditVisible] = useState(false);
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

    taskInputVisibleHandler();
  };
  //ADD THE NEW DATA ENDS

  //REMOVE THE DATA STARTS
  const removeTaskHandler = (taskId: number) => {
    setTasks((prevTask) => {
      return prevTask.filter((task) => task.id !== taskId);
    });
  };
  //REMOVE THE DATA ENDS

  //CHANGE THE COMPLETE STATUS OF THE DATA STARTS
  const completeTaskHandler = (taskId: number) => {
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
    const newTask = tasks.map((task) => {
      // id same then update the data with new data (complete) !task.complete to be safe since only true or false
      if (task.id === taskEditIdData) {
        setTaskEditData(taskUpdateData);
        return { ...task, text: taskUpdateData };
      }

      // if not the same then just send the before change
      return task;
    });

    setTasks(newTask);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [taskUpdateData]);
  //EDIT THE DATA ENDS

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
