const Button = ({ onInteractTask, text, status }) => {
  return (
    <>
      <button
        style={
          status === "edit"
            ? { backgroundColor: "yellow" }
            : { backgroundColor: "red" }
        }
        className={"edit-task-button"}
        type="submit"
        name="status"
        status="edit"
        onClick={onInteractTask}
      >
        {text}
      </button>
    </>
  );
};

export default Button;
