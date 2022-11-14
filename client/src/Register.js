import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import './styles/Register.css'
import Button from './Button'
import Input from './Input'

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
          <Input 
          inputStyle="input--clean--light"
          insputSize="input--big"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
      ></Input>
        </div>
        <div>
          <h3>Username</h3>
          <Input 
          inputStyle="input--clean--light"
          insputSize="input--big"
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
      ></Input>
        </div>
        <div>
          <h3>Password</h3>
          <Input 
          inputStyle="input--clean--light"
          insputSize="input--big"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
      ></Input>
        </div>
        <br />
        <div>
        <Button
            onClick={addUser}
            type="button"
            buttonStyle="btn--primary--outline"
            buttonSize="btn--medium"
          >
            Register
          </Button>
        </div>
      </form>
    </div>
  )
}

export default Register
