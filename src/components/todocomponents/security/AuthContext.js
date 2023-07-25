import {createContext, useContext, useState} from "react"
import {executeBasicAuthenticationService} from "../ApiCalloutComponent/ApiCallout";
import { apiClient } from "../ApiCalloutComponent/ApiClient";
import { executeJwtAuthenticationService } from "../ApiCalloutComponent/JwtAPIService";
// Create a context
export const AuthContext = createContext();
export const useContextCustomHook = () => useContext(AuthContext);



// Put some state in the context
// Share the created context with other components
export default function AuthProvider({children}) {
    const [authState, someAuthState] = useState("Authenticated")

    // Definining authentication state
    const [isAuthenticated, setAuthenticated] = useState(false);

    const [todoListGivenUsername, setTodoListGivenUsername] = useState([]);

    const [username, setUserName] = useState("DefaultUserName");

    const [basicAuthenticationToken, setBasicAuthenticationToken] = useState('');
    
    function oldLoginTodo(username, password) {
        if(username !== "" && password !== "") {
            
            setBasicAuthenticationToken(basicAuthenticationToken);
            setAuthenticated(true);
            setUserName(username);
            return true;
        }else {
            setAuthenticated(false);
            return false;
        }
    }

    async function loginTodoBasicAuthentication(username, password) {
        const basicAuthenticationToken = `Basic ` + window.btoa(username + ":" + password);
        try{
            const authResponse = await executeBasicAuthenticationService(basicAuthenticationToken);
        
            if(authResponse.data === "Success") {
                console.log("EXECUTED "+ authResponse.data)
                setAuthenticated(true);
                setUserName(username);
                setBasicAuthenticationToken(basicAuthenticationToken);
                
                apiClient.interceptors.request.use(
                    (config) => {
                        console.log('intercepting and adding token')
                        config.headers.Authorization = basicAuthenticationToken;
                        return config;
                    }
                )
                
                return true;
            }else{
                console.log("EXECUTED ELSE BLOCK " + authResponse.data)
                logoutTodo()
                return false;
            }
        }catch(response) {
            console.log(response);
            logoutTodo()
        }
    }

    async function loginTodo(username, password) {

        try{
            const authResponse = await executeJwtAuthenticationService(username, password);
        
            if(authResponse.status === 200) {
                // console.log("EXECUTED "+ authResponse.data)
                const bearerToken = `Bearer ` + authResponse.data.token;
                console.log(bearerToken);
                setAuthenticated(true);
                setUserName(username);
                setBasicAuthenticationToken(bearerToken);
                
                apiClient.interceptors.request.use(
                    (config) => {
                        console.log('intercepting and adding token')
                        config.headers.Authorization = bearerToken;
                        return config;
                    }
                )
                return true;
            }else{
                console.log("EXECUTED ELSE BLOCK " + authResponse.data)
                logoutTodo()
                return false;
            }
        }catch(response) {
            console.log(response);
            logoutTodo()
        }
    }

    function logoutTodo(){
        setAuthenticated(false);
        setUserName(null);
        setBasicAuthenticationToken(null);
    }
    // setInterval(() => {someAuthState(authState + " 1 ")}, 10)
    return (
        <AuthContext.Provider value= { {authState, isAuthenticated, todoListGivenUsername, username, basicAuthenticationToken, setAuthenticated, loginTodo, logoutTodo, setTodoListGivenUsername} }>
            {children}
        </AuthContext.Provider>
    )
}

