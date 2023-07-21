import { useState, useEffect } from "react";
import { listAllTodosForAGivenUsername } from "./ApiCalloutComponent/ApiCallout";


export default function ListTodoComponent() {
      const [todos, setTodo] = useState([]);
    
      function callTodos() {
      listAllTodosForAGivenUsername("a")
      .then((response) => {
          console.log(response.data);
          setTodo(response.data);
      })
      .catch((error) => console.log(error))    
      .finally(console.log("Finally block"))
      }
  
        useEffect( () => {
          callTodos();
        }, []); 
  

      return (
        <div className='container'>
            <h1>Things you want to do</h1>
            <table className='table'>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Completed</th>
                    <th>Target Date</th>
                </tr>
            </thead>
            <tbody>
                {todos && todos.map(todo =>
                    <tr key={todo.id}>
                        <td>{todo.username}</td>
                        <td>{todo.description}</td>
                        <td>{todo.done.toString()}</td>
                        <td>{todo.targetDate}</td>
                    </tr>
                )}
            </tbody>
            </table>

        </div>
      )
}
