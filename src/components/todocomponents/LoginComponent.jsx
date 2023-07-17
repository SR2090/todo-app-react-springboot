import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// 1st component
// functional component
export default function LoginComponent() {

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