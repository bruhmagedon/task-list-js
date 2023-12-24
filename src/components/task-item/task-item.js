import Service from "../../services/http.hook";
import { useTask } from "../app/app";

const TaskItem = ({ taskInfo: { Id, Status, Message } }) => {
  const { setCurrentTask, reRender, onRerender } = useTask();
  const { updateTask } = Service();

  //* Изменение статуса задачи
  const onUpdateTaskStatus = async () => {
    const updatedTask = {
      Id,
      Status: Number(!Status),
      Message,
    };
    onRerender(await updateTask(JSON.stringify(updatedTask)));
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
