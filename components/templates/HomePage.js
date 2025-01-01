import { useEffect, useState } from 'react'
import Tasks from "../module/Tasks"
import { useRouter } from 'next/router';

const HomePage = () => {
  const router = useRouter();
    const [todos, setTodos] = useState([]);

    useEffect(() => {
        fetchTodos();
    }, []);

    const fetchTodos = async () => {
        const response = await fetch("/api/todos");
        const data = await response.json();
        console.log(data)
        if(data.status === "success"){
            setTodos(data.data.todos);
        }
    }
  return (
    <div className='home-page'>
      <div className='home-page--todo'>
        <p>Todo</p>
        <Tasks data={todos.todo} fetchTodos={fetchTodos} next="inProgress" />
      </div>
      <div className='home-page--inProgress'>
        <p>In Progress</p>
        <Tasks data={todos.inProgress} next="review" back="todo" fetchTodos={fetchTodos} />
      </div>
      <div className='home-page--review'>
        <p>Review</p>
        <Tasks data={todos.review} next="done" back="inProgress" fetchTodos={fetchTodos} />
      </div>
      <div className='home-page--done'>
        <p>Done</p>
        <Tasks data={todos.done} back="review" fetchTodos={fetchTodos} />
      </div>
    </div>
  )
}

export default HomePage;
