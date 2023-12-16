import EditInput from "../edit-input/edit-input";

const EditPanel = ({
  onCloseEditPanel,
  currentTaskId,
  currentTaskInfo,
  onChangeTask,
}) => {
  //Буферный метод между компонентами для передачи состояния
  //e - объект события, text - текст выбранной задачи,
  //id - её идентификатор, status - что с задачей нужно сделать
  const onTaskSubmit = (e, text, id, status) => {
    e.preventDefault(); //чтобы страница не перезагружалась
    if (
      (typeof text === "undefined" || text.trimLeft() === "") &&
      status != "delete"
    ) {
      alert("Введите текст в поле");
      return;
    }
    //Передаём новую информацию вверх
    if (status === "add") {
      onChangeTask(e, text.trimLeft().trimRight(), currentTaskId, status);
    } else {
      onChangeTask(e, text.trimLeft().trimRight(), id, status);
    }
  };

  //Условный рендеринг
  if (currentTaskId != -1) {
    return (
      <div className="edit-container edit-task">
        <header className="edit-container-header">
          <span className="edit-close" onClick={onCloseEditPanel}></span>
        </header>
        <EditInput
          panelStatus={true}
          currentTaskId={currentTaskId}
          currentTaskInfo={currentTaskInfo[0]}
          onTaskSubmit={onTaskSubmit}
        />
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
