import React from "react";
import { useState } from "react";
import loginService from '../services/login'
import { ReactNotifications, Store } from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css';


const Login = () => {
    const [email, setEmail] = useState('') 
    const [password, setPassword] = useState('') 
    const [user, setUser] = useState(null)
    const [errorMessage, setErrorMessage] = useState(null)


    const handleLogin = async (event) => {
        event.preventDefault()
        try {
            const user = await loginService.login({
              email, password,
            })
            setUser(email)
            setEmail('')
            setPassword('')
            console.log("success")
          } catch (exception) {
            console.log(exception)
            Store.addNotification({
                title: "",
                message: 'Wrong credentials',
                type: "warning",
                insert: "top",
                container: "top-center",
            })
            console.log("wrong credentials")
            setTimeout(() => {
                Store.removeAllNotifications()
            //   setErrorMessage(null)
            }, 5000)
          }
    }
    return (
        <div>
            <ReactNotifications />
            <h1>Login</h1>
            <form onSubmit={handleLogin}>
            {/* <form> */}
            <div>
            email
                <input
                type="text"
                value={email}
                name="Username"
                onChange={({ target }) => setEmail(target.value)}
            />
            </div>
            <div>
            password
                <input
                type="password"
                value={password}
                name="Password"
                onChange={({ target }) => setPassword(target.value)}
            />
            </div>
            <button type="submit">login</button>
        </form>

        </div>
        
    );

}

export default Login;
