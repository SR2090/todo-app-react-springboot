import { useContext } from "react"
import { AuthContext } from "./security/AuthContext"

export default function FooterComponent() {
    const authState = useContext(AuthContext)
    console.log(`Auth state footer component ${authState.authState}`)
    return (
        <div className="footer">
            <hr /> <h1>Footer</h1>
        </div>
    )
} 