import {createContext, useState} from "react"
// Create a context
export const AuthContext = createContext();

// Put some state in the context
// Share the created context with other components
export default function AuthProvider({children}) {
    const [authState, someAuthState] = useState("Authenticated")

    return (
        <AuthContext.Provider value= { {authState} }>
            {children}
        </AuthContext.Provider>
    )
}