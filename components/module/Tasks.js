
const Tasks = ({ data }) => {
    return (
        <div className="tasks">
            {data?.map((task) => (
                <div key={task.id} className="task">
                    <span className={task.status}>{task.title}</span>
                </div>
            ))}
        </div>
    )
}

export default Tasks
