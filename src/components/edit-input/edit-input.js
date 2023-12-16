import { useState, useEffect } from "react";
import Button from "../button/button";

const EditInput = (
    panelStatus,
    onUpdateAppSearch,
    currentTaskInfo,
    onTaskSubmit
) => {
    const [status, setStatus] = useState("");
    const [term, setTerm] = useState("");
    const [text, setText] = useState("");
    const [id, setId] = useState(-1);

    //Первая отрисовка компонета - задаем дефолтный стейт
    useEffect(() => {
        onUpdateText(currentTaskInfo?.text, currentTaskInfo?.id);
    });
    // componentDidMount = () => {
    //   this.onUpdateText(
    //     this.props.currentTaskInfo?.text,
    //     this.props.currentTaskInfo?.id
    //   );
    // };

    //   //Меняем стейт при выборе другой задачи
    //   componentDidUpdate = () => {
    //     if (this.state.id != this.props.currentTaskInfo?.id) {
    //       this.onUpdateText(
    //         this.props.currentTaskInfo?.text,
    //         this.props.currentTaskInfo?.id
    //       );
    //     }
    //   };

    //Обновление состояние при перерендере или первой отрисовки компонента
    const onUpdateText = (updateText, updateId) => {
        setText(updateText);
        setId(updateId);
    };

    //Изменение стейта через инпут (двойная связь)
    const onEditTaskInput = (e) => {
        this.setState({
            // мейби можно сделать через редьюсер
            [e.target.name]: e.target.value,
        });
    };

    //Получаем статус задачи
    const onInteractTask = (e) => {
        this.setState({
            [e.target.name]: e.currentTarget.getAttribute("status"),
        });
    };

    //Отмена отправки формы по нажатию Enter
    const onKey = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
        }
    };
    return (
        <form
            className={"task-text-panel save-changes"}
            onSubmit={(e) => onTaskSubmit(e, text, id, status)}
        >
            <input
                type="text"
                className={"task-text-input save-changes"}
                placeholder={"Введите задачу"}
                name="text"
                value={text || ""}
                onChange={onEditTaskInput}
                onKeyDown={onKey}
            />
            <nav className="edit-container-buttons">
                <Button
                    text="Редактировать"
                    status={"edit"}
                    onInteractTask={onInteractTask}
                />
                <Button
                    text="Удалить"
                    status={"delete"}
                    onInteractTask={onInteractTask}
                />
            </nav>
        </form>
    );
};

export default EditInput;
