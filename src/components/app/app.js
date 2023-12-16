import { useEffect, useState, useContext } from "react";
import TaskItem from "../task-item/task-item";
import EditPanel from "../edit-panel/edit-panel";
import FindInput from "../find-input/find-input";

import "./app.scss";
import TaskList from "../task-list/task-list";

const App = () => {
    //Допустим приходит какой то get запрос с некоторыми данными и мы парсим их в данный массив, а затем отправляем в state

    const [currentTaskId, setCurrentTaskId] = useState(-1);
    const [maxId, setMaxId] = useState(1);
    const [term, setTerm] = useState("");

    // const ThemeContext = createContext(null);

    useEffect(() => {
        setMaxId(listItems.length - 1);
    }, []);

    //Выбрать задачу для редактирования (по кастомному атрибуту)
    const onChooseTask = (e) => {
        setCurrentTaskId(+e.currentTarget.getAttribute("id"));
    };

    //Закрыть панель редактирования
    const onClosePanel = () => {
        setCurrentTaskId(-1);
    };

    //Выдача результата на основе поиска
    const searchEmp = (tasks, term) => {
        if (term.length === 0) {
            return tasks;
        }
        return tasks.filter((task) => {
            return task.text.toLowerCase().indexOf(term.toLowerCase()) > -1;
        });
    };

    //Выбранная задача

    // console.log(data);
    const currentTaskInfo = data.filter((task) => {
        // console.log(task);
        if (task.id === currentTaskId) return task;
    });
    // console.log(currentTaskInfo);

    //Достать стейт компонента ниже, на него основе отредактировать текущий стейт
    const onChangeTask = (text, id, status) => {
        switch (status) {
            // *кейс надо переделать
            //   case "add":
            //     const newTask = {
            //       id: id,
            //       isChecked: true,
            //       text: text,
            //     };
            //     this.setState(({ data }) => {
            //       const tempData = [...data, newTask];
            //       return {
            //         data: tempData,
            //         maxId: id,
            //         currentTaskId: -1,
            //       };
            //     });
            //     return;
            case "edit":
                const tempData = data.map((task) => {
                    if (task.id === id) {
                        task.text = text;
                        return task;
                    }
                    return task;
                });
                setData(tempData);
                setCurrentTaskId(-1);
                return;
            case "delete":
                setData(data.filter((task) => task.id !== id));
                setCurrentTaskId(-1);
                return;
            default:
                return;
        }
    };

    //Изменение статуса задачи
    const onCheckTask = (id, prop) => {
        // this.setState(({ data }) => ({
        //   data: data.map((item) => {
        //     if (item.id === id) {
        //       //C помощью кастомного атрибута, находящегося в prop, можно создать новый объект массива data
        //       return { ...item, [prop]: !item[prop] };
        //     }
        //     return item;
        //   }),
        // }));
        // setData((data) => {
        //     data.map((item) => {
        //         if (item.id === id) {
        //             //C помощью кастомного атрибута, находящегося в prop, можно создать новый объект массива data
        //             return { ...item, [prop]: !item[prop] };
        //         }
        //         return item;
        //     });
        // });
    };

    return (
        <div className="app-container">
            <TaskList />
            <EditPanel
                onCloseEditPanel={onClosePanel}
                currentTaskId={currentTaskId}
                currentTaskInfo={currentTaskInfo}
                onChangeTask={onChangeTask}
            />
        </div>
    );
};

export default App;
