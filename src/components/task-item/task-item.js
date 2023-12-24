import Service from "../../services/http.hook";
import { useTask } from "../app/app";
import { useEffect } from "react";

const TaskItem = ({ taskInfo: { Id, Status, Message }, onRequest }) => {
  const { setCurrentTask } = useTask();

  // * пока что getTasks, но мейби поменяю на Task, тогда таск прийдется прокидывать вниз или чето по другому
  const { updateTask, process } = Service();

  useEffect(() => {
    if (process === "confirmed") {
      onRequest();
    }
  }, [process]);

  //* Изменение статуса задачи
  const onUpdateTaskStatus = async () => {
    const updatedTask = {
      Id,
      Status: Number(!Status),
      Message,
    };
    await updateTask(JSON.stringify(updatedTask));
  };

  const onChooseTask = () => {
    setCurrentTask({ Id, Status, Message });
  };

  const itemTaskIcons = "item-icon " + (!Status ? "unchecked" : "");
  return (
    <li className="item" value={Id}>
      <span className={itemTaskIcons} onClick={onUpdateTaskStatus}></span>
      <p className="item-text" onClick={!Status ? () => onChooseTask() : null}>
        {Message}
      </p>
    </li>
  );
};
export default TaskItem;
