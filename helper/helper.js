function sortData(todos){
    const sortedTodos = {};

    todos.map((todo) => {
        if(sortedTodos[todo.status]){
            sortedTodos[todo.status].push(todo);
        }else{
            sortedTodos[todo.status] = [todo];
        }
    })

}

export {sortData};