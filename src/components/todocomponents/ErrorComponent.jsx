export default function ErrorComponent() {
    return (
        <div className="error-message">
            <img src="error-icon.png" alt="Error Icon" className="error-icon"></img>
            <h2 className="error-heading">Oops! Something went wrong.</h2>
            <p className="error-description">We apologize for the inconvenience. Please try again later.</p>
        </div>
    )
}