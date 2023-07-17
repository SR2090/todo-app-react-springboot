import {createContext, useContext, useState} from "react"
// Create a context
export const AuthContext = createContext();
export const useContextCustomHook = () => useContext(AuthContext);
// Put some state in the context
// Share the created context with other components
export default function AuthProvider({children}) {
    const [authState, someAuthState] = useState("Authenticated")

    setInterval(() => {someAuthState(authState + " 1 ")}, 10)
    return (
        <AuthContext.Provider value= { {authState} }>
            {children}
        </AuthContext.Provider>
    )
}