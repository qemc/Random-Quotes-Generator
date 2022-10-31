import React from 'react'
import { useEffect, useState } from 'react'
import { Quot } from './helpers/types'
import axios from 'axios'
import { Link, Route } from 'react-router-dom'
import Button from './Button'

const api = axios.create({
  baseURL: 'http://localhost:5000',
  withCredentials: true,
})

const Liked = () => {
  const [quotes, setQuote] = useState([])

  const [isLiked, setIsLiked] = useState(true)

  const [id, setToDelete] = useState('')

  useEffect(() => {
    try {
      api.get('/get_liked').then((response) => {
        setQuote(response.data)
      })
    } catch (error) {
      console.log(error)
    }
  }, [])

  const deleteLike = async () => {
    try {
      const response = await api.post('/delete_like', {
        id,
      })

      window.location.href = '/liked'
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className='container'>
      {quotes.map((quote) => (
        <div className='quote-container' key={quote.id}>
          <h2 className='qutote-quote'>{quote.quote}</h2>
          <p className='quote-author'>Written by {quote.author}</p>
          <Button
            onClick={deleteLike}
            type="button"
            buttonStyle="btn--primary--solid"
            buttonSize="btn--medium"
            onMouseOver={() => {
              setToDelete(quote.id)
            }}
          >
            delete quote
          </Button>
          <h5>{quote.id}</h5>
        </div>
      ))}
    </div>
  )
}

export default Liked
