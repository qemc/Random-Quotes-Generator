import './styles/Login.css'
import React from 'react'
import { useState } from 'react'
import axios from 'axios'


const api = axios.create({
  baseURL: 'http://localhost:5000',
  withCredentials: true,
})

const Login = () => {
  const [login, setLogin] = useState('')
  const [password, setPassword] = useState('')

  const loginUser = async () => {
    try {
      const response = await api.post('/login', {
        login,
        password,
      })

      window.location.href = '/'
    } catch (error) {
      if (error.response.status === 401) {
        alert('invalid credentials')
        setLogin('')
        setPassword('')
      }
    }
  }

  return (
    <div className='container-login'>
      <form className='login-form'>
        <h3 className='login-label'>Login</h3>
        <input
          className='login-input'
          type="text"
          placeholder='login'
          value={login}
          onChange={(e) => setLogin(e.target.value)}
        />
        <h3 className='password-label'>Password</h3>
        <input
          className='password-input'
          type="password"
          value={password}
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}

        />
        <button
          type="button"
          onClick={loginUser}
          className='login-button'
        >
            
          {' '}
          Log In
        </button>
      </form>
    </div>
  )
}

export default Login
