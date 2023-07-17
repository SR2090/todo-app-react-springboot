import {Link, useParams } from 'react-router-dom'

export default function WelcomeComponent() {
    const {username} = useParams();

    return (
        <div className="welcome-screen">
        <h1 className="welcome-heading">Welcome, <span className="username">{username}</span>!</h1>
        <p className="welcome-message">We're glad to have you here.</p>
        <Link to={'/todos'}>
            <button className="start-button">Get Started</button>
        </Link>
        </div>
    )
}