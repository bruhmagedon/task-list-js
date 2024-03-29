import { useState, useEffect } from "react";
import Button from "../button/button";
import { useTask } from "../app/app";
import Service from "../../services/http.hook";

const EditInput = () => {
  const { currentTask, setCurrentTask, onRequest } = useTask();
  const { deleteTask, updateTask, process, deleteProcess } = Service();

  const [text, setText] = useState("");

  useEffect(() => {
    setText(currentTask.Message);
  }, [currentTask]);

  useEffect(() => {
    if (process === "confirmed" || deleteProcess === "confirmed") {
      onRequest();
    }
    console.log(process);
  }, [process]);

  const onUpdateTask = async (e) => {
    e.preventDefault();
    if (text === "") return;
    const updatedTask = {
      Id: currentTask.Id,
      Status: Number(currentTask.Status),
      Message: text,
    };

    await updateTask(JSON.stringify(updatedTask));
  };

  const onDelete = async (e) => {
    e.preventDefault();
    setCurrentTask("");
    await deleteTask(currentTask.Id);
  };

  return (
    <form className={"task-text-panel save-changes"}>
      <input
        type="text"
        className={"task-text-input save-changes"}
        placeholder={"Введите задачу"}
        value={text || ""}
        onChange={(e) => setText(e.target.value)}
      />
      <nav className="edit-container-buttons">
        <Button text="Редактировать" status={"edit"} onAction={onUpdateTask} />
        <Button text="Удалить" status={"delete"} onAction={onDelete} />
      </nav>
    </form>
  );
};

export default EditInput;
