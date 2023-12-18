import { useEffect, useState } from "react";
import Service from "../../services/http.hook";
import FindInput from "../find-input/find-input";
import TaskItem from "../task-item/task-item";

const TaskList = () => {
  const [data, setData] = useState([]);
  const [term, setTerm] = useState("");

  // ! кастыль
  const [reRender, onRerender] = useState(null);

  const { getTasks, createTask } = Service();

  //пока что автоматическое обновление будет выглядеть так
  useEffect(() => {
    onRequest();
  }, [reRender]);

  //! получаем список задач с базы
  const onRequest = () => {
    // console.log("asd");
    getTasks().then((tasks) => setData(tasks));
  };

  //Обновление строки поиска
  const onUpdateSearch = (e) => {
    setTerm(e.target.value);
  };

  //Выдача результата на основе поиска (возможно стоит добавить дополнительную кнопку)
  const searchEmp = (tasks, term) => {
    if (term.length === 0) {
      return tasks;
    }
    return tasks.filter((task) => {
      return task.Message.toLowerCase().indexOf(term.toLowerCase()) > -1;
    });
  };

  const onAddTask = async () => {
    if (term.length === 0) {
      return;
    }
    setTerm("");

    const newTask = {
      Status: 0,
      Message: term,
    };

    onRerender(await createTask(JSON.stringify(newTask)));
  };

  //Cписок задач
  const tasks = searchEmp(data, term).map((task) => {
    return <TaskItem key={task.Id} taskInfo={task} />;
  });

  return (
    <div className="task-container">
      <FindInput
        onUpdateSearch={onUpdateSearch}
        onAddTask={onAddTask}
        term={term}
      />
      <ul className="task-list-container">{tasks}</ul>
    </div>
  );
};

export default TaskList;
