const listItems = [
    {
        id: 0,
        isChecked: false,
        text: "Сделать таск-лист",
    },
    {
        id: 1,
        isChecked: false,
        text: "Выложить в гитхаб",
    },
];

const TaskList = ({ maxId }) => {
    const [data, setData] = useState(listItems);
    //Обновление строки поиска
    const onUpdateSearch = (e) => {
        setTerm(e.target.value);
    };

    //Изменение стейта при добавление задачи (ПЕРЕДЕЛАТЬ так чтобы не открывалась эдит панель)
    const onAddTask = () => {
        setCurrentTaskId(maxId + 1);
    };

    //  Cписок задач
    const tasks = searchEmp(data, term).map((task) => {
        return <TaskItem key={task.id} taskInfo={task} />;
    });

    return (
        <div className="task-container">
            <FindInput onUpdateSearch={onUpdateSearch} onAddTask={onAddTask} />
            <ul className="task-list-container">{tasks}</ul>
        </div>
    );
};

export default TaskList;
