import { BiRightArrow } from "react-icons/bi";
import { BiLeftArrow } from "react-icons/bi";
import { RiMastodonLine } from "react-icons/ri";


const Tasks = ({ data , next , back , fetchTodos}) => {

    const changeStatus = async (id, status) => {
        const response = await fetch(`/api/todos`, {
            method: "PATCH",
            body: JSON.stringify({status , id}),
            headers: {
                "Content-Type": "application/json"
            }
        })
        const data = await response.json();
        if(data.status === 200){
            fetchTodos();
        }
    }
    return (
        <div className="tasks">
            {data?.map((task) => (
                <div key={task._id} className="tasks__card">
                    <span className={task.status}></span>
                    <RiMastodonLine/>
                    <h4 >{task.title}</h4>
                    <div>
                        {
                            back ? <button className="button-back" onClick={() => changeStatus(task._id, back)}>
                                <BiLeftArrow/> Back
                            </button> : null
                        }
                        {
                            next ? <button className="button-next"  onClick={() => changeStatus(task._id, next)}>
                                <BiRightArrow/> next
                            </button> : null
                        }
                    </div>
                </div>
            ))}
        </div>
    )
}

export default Tasks
