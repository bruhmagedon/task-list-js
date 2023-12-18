import EditInput from "../edit-input/edit-input";
import { useTask } from "../app/app";

const EditPanel = () => {
  const {
    currentTask: { Id },
    setCurrentTask,
  } = useTask();

  //Закрыть панель редактирования
  const onClosePanel = () => {
    setCurrentTask("");
  };

  // Если задача выбрана
  if (Id) {
    return (
      <div className="edit-container edit-task">
        <header className="edit-container-header">
          <span className="edit-close" onClick={onClosePanel}></span>
        </header>
        <EditInput />
      </div>
    );
  }

  return (
    <div className="edit-container edit-task">
      <p className="edit-notask-message">Выберите задачу</p>
    </div>
  );
};
export default EditPanel;
