import { useState, useEffect } from "react";
import { useContextCustomHook } from './security/AuthContext'
import { useNavigate} from 'react-router-dom';
import { listAllTodosForAGivenUsername, deleteTodoGivenId } from "./ApiCalloutComponent/ApiCallout";


export default function ListTodoComponent() {
    const [todos, setTodo] = useState([]);
    const [message, setMessage] = useState(false);

    const getContext = useContextCustomHook();
    const navigate = useNavigate();
    // get from context params will be security problem
    const username = getContext.username;
    function callTodos() {
        
    listAllTodosForAGivenUsername(username)
    .then((response) => {
        setTodo(response.data);
    })
    .catch((error) => console.log(error))    
    .finally(console.log("Finally block"))
    }

    useEffect( () => {
        callTodos();
    }, []); 
  
    function deleteHandler(id) {
        setMessage(`Deleted todo entry ${id}`)
        // console.log(getContext.username + " " + id);
        deleteTodoGivenId(getContext.username, id)
        .then(() => {
           callTodos();
        })
        .catch((error) => console.log(error))    
        .finally(
           // console.log("Finally block")
        )
    }

    function updateHandler(id) {
        //console.log(" " + id);
        navigate(`/update/${id}`)
    }
    
    function addNewTodo() {
        navigate(`/update/-1`)
    }

    return (
    <div className='container'>
        <h1>Things you want to do</h1>
        {message && <div className="alert alert-primary" >{message}</div>}
        <table className='table'>
        <thead>
            <tr>
                <th>Name</th>
                <th>Description</th>
                <th>Completed</th>
                <th>Target Date</th>
                <th>Delete Todo</th>
                <th>Update Todo</th>
            </tr>
        </thead>
        <tbody>
            {todos && todos.map(todo =>
                <tr key={todo.id}>
                    <td>{todo.username}</td>
                    <td>{todo.description}</td>
                    <td>{todo.done.toString()}</td>
                    <td>{todo.targetDate.toString()}</td>
                    <td><button className="delete-button" 
                    onClick={() => deleteHandler(todo.id)}>Delete</button></td>
                    <td><button className="delete-button" 
                    onClick={() => updateHandler(todo.id)}>Update</button></td>
                </tr>
            )}
        </tbody>
        </table>
        <button className="btn btn-success m-5" onClick={addNewTodo}>Add new todo</button>
        </div>
      )
}
