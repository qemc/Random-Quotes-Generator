import React from "react";
import { useEffect, useState } from "react";
import { Quot } from "./helpers/types";
import axios from "axios";
import { Link, Route } from "react-router-dom";


const api = axios.create({
    baseURL: "http://localhost:5000",
    withCredentials: true,
});


const Liked = () => {

  const [quotes, setQuote] = useState([])

  const [isLiked, setIsLiked] = useState(true)
  
  const [id, setToDelete] = useState('')


    useEffect(() => {
        //in progrsss
        try {
          api.get("/get_liked").then((response) => {
              setQuote(response.data)
            });
          } catch (error) {
            console.log(error);
          }

    }, [])
  
  const deleteLike = async () => {
    try {
        const response = await api.post("/delete_like", {
        id,
      });
      
      window.location.href = "/liked";
      
      } catch (error) {
      
        console.log(error)
      
      }
    }
  

  
  
    return ( 
        <div>
          {quotes.map(quote => (
          <div className="blog-preview" key={quote.id}>
              <h2>{ quote.quote }</h2>
              <p>Written by {quote.author}</p>
              <button type='button' onMouseOver={() => {
                setToDelete(quote.id);
                
              }} onClick={deleteLike}> delete </button>
              <h5>{ quote.id }</h5>
          </div>
          ))}
        </div>
     );
}
 
export default Liked;