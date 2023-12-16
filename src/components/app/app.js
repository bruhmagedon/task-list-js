import { useEffect, useState } from "react";
import TaskItem from "../task-item/task-item";
import EditPanel from "../edit-panel/edit-panel";
import FindInput from "../find-input/find-input";

import "./app.scss";

const listItems = [
  {
    id: 0,
    isChecked: true,
    text: "Сделать таск-лист",
  },
  {
    id: 1,
    isChecked: true,
    text: "Выложить в гитхаб",
  },
];

const App = () => {
  //Допустим приходит какой то get запрос с некоторыми данными и мы парсим их в данный массив, а затем отправляем в state
  const [data, setData] = useState(listItems);

  const [currentTaskId, setCurrentTaskId] = useState(-1);
  const [maxId, setMaxId] = useState(1);
  const [term, setTerm] = useState("");

  //Выбрать задачу для редактирования (по кастомному атрибуту)
  const onChooseTask = (e) => {
    setCurrentTaskId(+e.currentTarget.getAttribute("id"));
  };

  //Закрыть панель редактирования
  const onClosePanel = () => {
    setCurrentTaskId(-1);
  };

  //Обновление строки поиска
  const onUpdateSearch = (e) => {
    setTerm(e.target.value);
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
  const currentTaskInfo = data.filter((task) => task.id === currentTaskId);

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

  //Изменение стейта при добавление задачи (ПЕРЕДЕЛАТЬ так чтобы не открывалась эдит панель)
  const onAddTask = () => {
    setCurrentTaskId(maxId + 1);
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
  };

  //  Cписок задач
  const tasks = searchEmp(data, term).map((task) => {
    const { id, ...taskProps } = task;
    return (
      <TaskItem
        key={id}
        id={id}
        {...taskProps}
        onChooseTask={onChooseTask}
        onCheckTask={onCheckTask}
      />
    );
  });

  return (
    <div className="app-container">
      <div className="task-container">
        <FindInput onUpdateSearch={onUpdateSearch} onAddTask={onAddTask} />
        <ul className="task-list-container">{tasks}</ul>
      </div>
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
