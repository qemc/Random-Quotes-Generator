import React from "react"
import { useState } from "react"
import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:5000",
    withCredentials: true,
  });

const Login = () => {

    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')

    const loginUser = async () => {
        try {
            const response = await api.post("/login",{
                login,
                password,
            });
            
            window.location.href = "/";
            
        } catch (error) {
            if (error.response.status === 401) {
                alert("invalid credentials");
                setLogin('')
                setPassword('')
            }
        }
    }


    
    
    return ( 
        <div>
            <form>
                <h3>Login</h3>
                <input
                    type='text'
                    value={login}
                    onChange={(e)=>setLogin(e.target.value)}
                />
                <h3>Ppassword</h3>
                <input
                    type='password'
                    value={password}
                    onChange={(e)=>setPassword(e.target.value)}
                />
                <button type='button' onClick={loginUser}> Log In</button>
            </form>
        </div>
     );
}
 
export default Login;