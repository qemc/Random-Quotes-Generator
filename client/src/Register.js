import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import './styles/Register.css'

const api = axios.create({
  baseURL: 'http://localhost:5000',
  withCredentials: true,
})

const Register = () => {
  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const addUser = async () => {
    try {
      const response = await api.post('/register', {
        email,
        username,
        password,
      })

      window.location.href = '/home'
    } catch (error) {
      if (error.response.status === 401) {
        alert('invalid credentials')
        setEmail('')
        setUsername('')
        setPassword('')
      }
    }
  }

  return (
    <div className='container-register'>
      <form className='register-form'>
        <div>
          <h3>Email</h3>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <h3>username</h3>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <h3>password</h3>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <br />
        <div>
          <button type="button" onClick={addUser}>
            submit
          </button>
        </div>
      </form>
    </div>
  )
}

export default Register
