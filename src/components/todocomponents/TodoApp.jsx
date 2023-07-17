import { useState } from 'react'
import { BrowserRouter, Routes } from 'react-router-dom'
import './TodoApp.css'

export default function TodoApp() {
    return (
        <div className="TodoApp">
            {/* <h1>Todo Management application</h1> */}
            BrowserRouter
            <LoginComponent /> 
            <WelcomeComponent />
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
    return (
        <div className="Welcome">
            Welcome Component
        </div>
    )
}