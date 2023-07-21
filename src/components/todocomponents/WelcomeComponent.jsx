import {Link, useParams } from 'react-router-dom'
import axios from 'axios';
export default function WelcomeComponent() {
    const {username} = useParams();

    function callHelloWorldRestApi() {
        // console.log("Call")
        axios.get("http://localhost:8080/hello-world")
        .then((response) => {console.log(response.data);})
        .catch((error) => console.log(error))    
        .finally(console.log("Finally block"));
    }

    
    return (
        <div className="welcome-screen">
        <h1 className="welcome-heading">Welcome, <span className="username">{username}</span>!</h1>
        <p className="welcome-message">We're glad to have you here.</p>
        <Link to={'/todos'}>
            <button className="start-button">Get Started</button>
        </Link>
        <div className="container">
            <button className="hello-button" onClick={callHelloWorldRestApi}>Hello World REST</button>
        </div>
        </div>
    )
}