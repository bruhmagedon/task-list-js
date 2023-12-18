const Button = ({ text, status, onAction }) => {
  const buttonStyle =
    "edit-task-button " + (status === "edit" ? null : "delete");

  return (
    <>
      <button className={buttonStyle} onClick={onAction}>
        {text}
      </button>
    </>
  );
};

export default Button;
