import { useEffect, useState } from 'react'

const HomePage = () => {
    const [todos, setTodos] = useState([]);

    useEffect(() => {
        fetchTodos();
    }, []);

    const fetchTodos = async () => {
        const response = await fetch("/api/todos");
        const data = await response.json();
        if(data.status === "success"){
            setTodos(data.data.todos);
        }
    }
  return (
    <div className='home-page'>
      <div className='home-page--todo'>
        <p>Todo</p>
        <Tasks data={todos.todo} />
      </div>
      <div className='home-page--todo'>
        <p>In Progress</p>
        <Tasks data={todos.inProgress} />
      </div>
      <div className='home-page--todo'>
        <p>Review</p>
        <Tasks data={todos.review} />
      </div>
      <div className='home-page--todo'>
        <p>Done</p>
        <Tasks data={todos.done} />
      </div>
    </div>
  )
}

export default HomePage;
