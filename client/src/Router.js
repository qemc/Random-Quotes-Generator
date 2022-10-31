import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './Home'
import Register from './Register'
import Login from './Login'
import Liked from './Liked'
import Start from './Start'
import useCurrentUser from "./helpers/GetUser";
import { User } from './helpers/types'
import axios from 'axios'


const api = axios.create({
  baseURL: "http://localhost:5000",
  withCredentials: true,
});

function Router() {
  const loggedUser = useCurrentUser();
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Start />} />
        <Route path="/home" element={loggedUser != User ? <Home /> : <Start/>} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/liked" element={<Liked />} />
      </Routes>
    </div>
  )
}

export default Router
