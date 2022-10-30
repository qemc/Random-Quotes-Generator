import React from 'react'
import { useEffect, useState } from 'react'
import './styles/Home.css'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { User, Quot } from './helpers/types'
import useCurrentUser from './helpers/GetUser'

const api = axios.create({
  baseURL: 'http://localhost:5000',
  withCredentials: true,
})

const Home = () => {
  const [quote, setQuote] = useState(Quot)
  const [liked, setLiked] = useState(false)
  const loggedUser = useCurrentUser()



  const get = () => {
    try {
      api.get('/').then((response) => {
        setQuote((quot) => ({
          author: response.data.author,
          category: response.data.category,
          quote: response.data.quote,
          is_liked: response.data.is_liked,
        }))
        setLiked(response.data.is_liked)
      })
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(get, [])

  const logOut = () => {
    try {
      api.post('/logout')
      window.location.reload();
      //window.location.href = '/'
    } catch (error) {
      console.log(error)
    }
  }

  const like = () => {
    setLiked(true)
    api.post('/like')
  }

  const next = () => {
    get()
  }

  return (
    <div>
      {loggedUser != User ? (
        <div>
          <h2 className='author'>{quote.author}</h2>
          <h2 className='quote'>{quote.quote}</h2>
          <h2 className='category'>{quote.category}</h2>
          <br />
          <h1>you are logged as : {loggedUser.username}</h1>
          <h1>with ID : {loggedUser.id}</h1>
          <button type="button" onClick={logOut}>
            logout
          </button>
          <button type="button" onClick={like}>
            like this quote
          </button>
          <button type="button" onClick={next}>
            next quote
          </button>
          <Link to={'/liked'}>
            <button type="button">view liked quotes</button>
          </Link>

          {liked === true ? (
            <div>
              <h4>quote is liked</h4>
            </div>
          ) : (
            <div>
              <h4>quote is not liked</h4>
            </div>
          )}
        </div>
      ) : (
        <div className='container-starting-page'>
          <h1>WELECOME</h1>
          <form className='starting-form'>
            <Link to="/register">
              <button className='register-button button'>register</button>
            </Link>
            <Link to="/login">
              <button className='login-button button'>login</button>
            </Link>
          </form>
        </div>
      )}
    </div>
  )
}

export default Home
