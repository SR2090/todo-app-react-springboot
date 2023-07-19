
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import ErrorComponent from './ErrorComponent'
import FooterComponent from './FooterComponent'
import HeaderComponent from './HeaderComponent'
import ListTodoComponent from './ListTodoComponent'
import LoginComponent from './LoginComponent'
import LogoutComponent from './LogoutComponent'
import './TodoApp.css'
import WelcomeComponent from './WelcomeComponent'
import {useContextCustomHook} from './security/AuthContext'
// Authprovider
import AuthProvider from './security/AuthContext'


// Authenticate the links
function AuthenticatedComponents({children}) {
    const authContextAccess = useContextCustomHook();
    if(authContextAccess.isAuthenticated){
        return children;
    }else{
        return (
            <div className="success-message">
                <h1>Successful Logout</h1>
                <p>You have been logged out successfully.</p>
            </div>
        )
    }
    // we can also navigate to root page
    // return <Navigate to="/" />
}
export default function TodoApp() {
    return (
        <div className="TodoApp">
            <AuthProvider>
                <BrowserRouter> 
                    <HeaderComponent />
                        <Routes>
                            <Route path='/' element={<LoginComponent/>}></Route>
                            <Route path='/login' element={<LoginComponent/>}></Route>
                            <Route path='/welcome/:username' element={

                            <AuthenticatedComponents>
                                <WelcomeComponent/>    
                            </AuthenticatedComponents>}></Route>
                            <Route path='/todos' element={
                            <AuthenticatedComponents>
                                <ListTodoComponent/>
                            </AuthenticatedComponents>}></Route>

                            <Route path='/logout' element={
                            <AuthenticatedComponents>
                                <LogoutComponent/>    
                            </AuthenticatedComponents>
                            }></Route>

                            <Route path='*' element={<ErrorComponent/>}></Route>
                        </Routes>
                    <FooterComponent/>
                </BrowserRouter>
            </AuthProvider>
        </div>
    )
}
