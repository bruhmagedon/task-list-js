const FindInput = ({ onUpdateSearch, onAddTask, term }) => {
  // Текстовая панель для поиска
  return (
    <div className={"task-text-panel "}>
      <input
        type="text"
        value={term}
        className={"task-text-input "}
        placeholder={"Найти задачу или добавить новую"}
        onChange={onUpdateSearch}
      />
      <button className={"task-text-button"} onClick={onAddTask}>
        +
      </button>
    </div>
  );
};

export default FindInput;
