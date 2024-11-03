import {GrAddCircle} from "react-icons/gr";
import {BsAlignStart} from "react-icons/bs";

const AddTodo = () => {
    const [title, setTitle] = useState("");
    const [status, setStatus] = useState("todo");
  return (
    <div className='add-form'>
      <h2 className="">
        <GrAddCircle/>
        Add New Todo
      </h2>
      <div className="add-form__input">
        <div className="add-form__input--first">
            <label htmlFor="title">Title: </label>
            <input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)}/>
        </div>
        <div className="add-form__input--second">
            <div className="todo">
                <label htmlFor="date">
                    <BsAlignStart/>
                    todo: 
                    </label>
                <input type="radio" id="todo" value="todo" checked={status === "todo"} onChange={(e) => setStatus(e.target.value)}/>
            </div>
            <div className="inProgress">
                <label htmlFor="inProgress">
                    <BsAlignStart/>
                    inProgress:
                    </label>
                <input type="radio" id="inProgress" value="inProgress" />
            </div>
        </div>
      </div>
    </div>
  )
}

export default AddTodo
