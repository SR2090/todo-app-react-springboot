import { useState } from 'react'
import { BrowserRouter, Routes, Route, useNavigate, useParams } from 'react-router-dom'
import './TodoApp.css'

export default function TodoApp() {
    return (
        <div className="TodoApp">
            {/* <h1>Todo Management application</h1> */}
            <BrowserRouter> 
                <Routes>
                    <Route path='/' element={<LoginComponent/>}></Route>
                    <Route path='/login' element={<LoginComponent/>}></Route>
                    <Route path='/welcome/:username' element={<WelcomeComponent/>}></Route>
                    <Route path='/todos' element={<ListTodoComponent/>}></Route>

                    <Route path='*' element={<ErrorComponent/>}></Route>
                </Routes>
            </BrowserRouter>
        </div>
    )
}


// 1st component
// functional component
function LoginComponent() {

    const [username, setUserName] = useState("DefaultUserName")
    const [password, setPassword] = useState("")
    const [isSuccess, setisSuccess] = useState(false);
    const [isError, setisError] = useState(false);

    // navigate state to route to welcome endpoint on successful login
    const navigate = useNavigate();

    function handleUserNameChange(event) {
        // console.log("", event.target.value)
        setUserName(event.target.value);
    }

    function handlePasswordChange(event) {
        // console.log("", event.target.value)
        setPassword(event.target.value);
    }

    function handleFormSubmit(event) {
        event.preventDefault();
        console.log(username);
        console.log(password);
        if(username === 'babi' && password === "") {
            setisSuccess(true);
            setisError(false);
            // on successful login navigate to /welcome endpoint
            navigate(`/welcome/${username}`)
        }else {
            setisSuccess(false);
            setisError(true);
        }
    }

    return (
        <div className="Login">
                {isSuccess && <div className="successMessage">Login is successful</div>}
                {isError && <div className="failureMessage">Login has failed</div>}
            <form onSubmit={handleFormSubmit}>
                <label> User Name </label>
                <input type="text" name="username" value={username} onChange={handleUserNameChange}/><br/>
                
                <label> Password </label>
                <input type="password" name="password" value={password} onChange={handlePasswordChange}/><br/>
                
                <button type = "submit">Submit Form</button>
            </form>
        </div>
    )
}


function WelcomeComponent() {
    const {username} = useParams();

    return (
        <div className="welcome-screen">
        <h1 className="welcome-heading">Welcome, <span className="username">{username}</span>!</h1>
        <p className="welcome-message">We're glad to have you here.</p>
        <button className="start-button">Get Started</button>
        </div>
    )
}


function ErrorComponent() {
    return (
        <div className="error-message">
            <img src="error-icon.png" alt="Error Icon" className="error-icon"></img>
            <h2 className="error-heading">Oops! Something went wrong.</h2>
            <p className="error-description">We apologize for the inconvenience. Please try again later.</p>
        </div>
    )
}


function ListTodoComponent() {
    const today = new Date();
    const targetDate = new Date(today.getFullYear() + 12, today.getMonth() + 1, today.getDate());
    const todos = [
        { id: 1, name: 'Complete assignment', isDone : false, targetDate : targetDate },
        { id: 2, name: 'Go grocery shopping', isDone : false, targetDate : targetDate },
        { id: 3, name: 'Call a friend', isDone : false, targetDate : targetDate },
        { id: 4, name: 'Read a book', isDone : false, targetDate : targetDate },
        { id: 5, name: 'Exercise for 30 minutes', isDone : false, targetDate : targetDate },
      ];


      return (
        <div>
            <h1>Things you want to do</h1>
            <table>
            <thead>
                <tr>
                <th>ID</th>
                <th>Name</th>
                <th>IsDone ?</th>
                <th>Target Date</th>
                </tr>
            </thead>
            <tbody>
                {todos && todos.map(todo =>
                    <tr key={todo.id}>
                        <td>{todo.id}</td>
                        <td>{todo.name}</td>
                        <td>{todo.isDone.toString()}</td>
                        <td>{todo.targetDate.toDateString()}</td>
                    </tr>
                )}
            </tbody>
            </table>

        </div>
      )
}