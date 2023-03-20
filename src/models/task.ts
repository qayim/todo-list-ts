class Task {
  id: number;
  text: string;
  complete: boolean;
  constructor(taskText: string, taskId: number, taskComplete: boolean) {
    this.text = taskText;
    this.id = taskId;
    this.complete = taskComplete;
  }
}
export default Task;