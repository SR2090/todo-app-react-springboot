import { useState } from 'react'
import './TodoApp.css'

export default function TodoApp() {
    return (
        <div className="TodoApp">
            {/* <h1>Todo Management application</h1> */}
            <LoginComponent /> 
            {/* <WelcomeComponent /> */}
        </div>
    )
}


// 1st component
// functional component
function LoginComponent() {

    const [username, setUserName] = useState("DefaulUserName")
    const [password, setPassword] = useState("")

    function handleUserNameChange(event) {
        // console.log("", event.target.value)
        setUserName(event.target.value);
    }

    function handlePasswordChange(event) {
        // console.log("", event.target.value)
        setPassword(event.target.value);
    }
    return (
        <div className="Login">
            <div className="LoginForm">
                <div>
                    <label> User Name </label>
                    <input type="text" name="username" value={username} onChange={handleUserNameChange}/>
                </div>
                <div>
                    <label> Password </label>
                    <input type="password" name="password" value={password} onChange={handlePasswordChange}/>
                </div>
                <div>
                    <button type = "button" name="login" > Submit Form</button>
                </div>
            </div>
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