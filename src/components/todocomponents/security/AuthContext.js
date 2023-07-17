import {createContext, useContext, useState} from "react"
// Create a context
export const AuthContext = createContext();
export const useContextCustomHook = () => useContext(AuthContext);
// Put some state in the context
// Share the created context with other components
export default function AuthProvider({children}) {
    const [authState, someAuthState] = useState("Authenticated")

    // Definining authentication state
    const [isAuthenticated, setAuthenticated] = useState(false);

    // setInterval(() => {someAuthState(authState + " 1 ")}, 10)
    return (
        <AuthContext.Provider value= { {authState, isAuthenticated, setAuthenticated} }>
            {children}
        </AuthContext.Provider>
    )
}