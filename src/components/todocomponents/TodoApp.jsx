
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import ErrorComponent from './ErrorComponent'
import FooterComponent from './FooterComponent'
import HeaderComponent from './HeaderComponent'
import ListTodoComponent from './ListTodoComponent'
import LoginComponent from './LoginComponent'
import LogoutComponent from './LogoutComponent'
import './TodoApp.css'
import WelcomeComponent from './WelcomeComponent'

// Authprovider
import AuthProvider from './security/AuthContext'

export default function TodoApp() {
    return (
        <div className="TodoApp">
            <AuthProvider>
                <BrowserRouter> 
                    <HeaderComponent />
                        <Routes>
                            <Route path='/' element={<LoginComponent/>}></Route>
                            <Route path='/login' element={<LoginComponent/>}></Route>
                            <Route path='/welcome/:username' element={<WelcomeComponent/>}></Route>
                            <Route path='/todos' element={<ListTodoComponent/>}></Route>

                            <Route path='/logout' element={<LogoutComponent/>}></Route>

                            <Route path='*' element={<ErrorComponent/>}></Route>
                        </Routes>
                    <FooterComponent/>
                </BrowserRouter>
            </AuthProvider>
        </div>
    )
}
