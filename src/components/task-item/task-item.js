import { useEffect, useState } from "react";

const TaskItem = ({ taskInfo: { id, isChecked, text } }) => {
    const [status, setStatus] = useState(isChecked);

    useEffect(() => {
        // console.log(status);
    }, []);

    const itemTaskIcons = "item-icon " + (!isChecked ? "unchecked" : "");

    return (
        <li className="item" value={id}>
            <span
                className={itemTaskIcons}
                // onClick={(e) => onCheckTask(id)}
                // data-toggle="isChecked"
            ></span>
            {/* Изменить / удалить можно только если задача в процессе */}
            <p
                className="item-text"
                // onClick={isChecked ? onChooseTask : null}
                // id={id}
            >
                {text}
            </p>
        </li>
    );
};
export default TaskItem;
