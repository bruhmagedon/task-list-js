const FindInput = ({ onUpdateSearch, onAddTask }) => {
  // Текстовая панель для поиска
  return (
    <div className={"task-text-panel "}>
      <input
        type="text"
        className={"task-text-input "}
        placeholder={"Найти задачу или добавить новую"}
        onChange={onUpdateSearch}
      />
      {/* переделать так чтобы по нажатию на плюсик сразу добавлялась новая задачка без открытия нового окна*/}
      <button className={"task-text-button"} onClick={onAddTask}>
        +
      </button>
    </div>
  );
};

export default FindInput;
