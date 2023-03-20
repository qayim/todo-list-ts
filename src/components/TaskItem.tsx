import "./TaskItem.css";
import Task from "../models/task";

type TypeItemProps = {
  items: Task[];
  onRemoveTask: (id: number) => void;
  onEditTask: (id: number) => void;
  onCompleteTask: (id: number) => void;
};

const TaskItem: React.FC<TypeItemProps> = (props) => {
  return (
    <div>
      <p className="todo-title">Todo list</p>

      <div className="todo-item">
        {props.items.map((item) => (
          <div className="todo-item-box" key={item.id}>
            <div
              className="todo-item-text-container"
              onClick={props.onCompleteTask.bind(null, item.id)}
            >
              <p
                className={`todo-item-text ${item.complete ? "completed" : ""}`}
              >
                {item.text}
              </p>
            </div>
            <div className="todo-item-icon-container">
              <i
                className="material-icons"
                onClick={props.onRemoveTask.bind(null, item.id)}
                style={{
                  fontSize: "200%",
                  color: "#f3caf5",
                  margin: "5%",
                  padding: "5%",
                  borderStyle: "solid",
                  borderColor: "#f3caf5",
                  borderRadius: "10px",
                }}
              >
                delete
              </i>
              <i
                className="material-icons"
                onClick={props.onEditTask.bind(null, item.id)}
                style={{
                  fontSize: "200%",
                  color: "#bbf5cd",
                  margin: "5%",
                  padding: "5%",
                  borderStyle: "solid",
                  borderColor: "#bbf5cd",
                  borderRadius: "10px",
                }}
              >
                edit
              </i>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskItem;
