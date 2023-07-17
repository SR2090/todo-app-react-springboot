import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useContextCustomHook } from './security/AuthContext'
// 1st component
// functional component
export default function LoginComponent() {

    const [username, setUserName] = useState("DefaultUserName")
    const [password, setPassword] = useState("")
    const [isSuccess, setisSuccess] = useState(false);
    const [isError, setisError] = useState(false);
    
    // Access to auth context using the custom hook
    const authContextAccess = useContextCustomHook();

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
            authContextAccess.setAuthenticated(true);
            // setisSuccess(true);
            // setisError(false);
            // on successful login navigate to /welcome endpoint
            navigate(`/welcome/${username}`)
        }else {
            authContextAccess.setAuthenticated(false);
            // setisSuccess(false);
            // setisError(true);
        }
    }

    return (
        <div className="Login">
                {authContextAccess.isAuthenticated && <div className="successMessage">Login is successful</div>}
                {authContextAccess.isAuthenticated && <div className="failureMessage">Login has failed</div>}
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