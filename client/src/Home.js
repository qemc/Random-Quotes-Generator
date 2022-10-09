import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import {User, Quot} from './helpers/types';
import useCurrentUser from "./helpers/GetUser";

const api = axios.create({
  baseURL: "http://localhost:5000",
  withCredentials: true,
});

const Home = () => {

  const [quote, setQuote] = useState(Quot);

  const loggedUser = useCurrentUser(quote);


  useEffect(() => {
    try {
      api.get("/").then((response) => {
        setQuote((quot) => ({
          author: response.data.author,
          category: response.data.category,
          quote: response.data.quote,
        }));
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  const logOut = () => {
    try {
      api.post('/logout')
      window.location.href = '/';
    } catch (error) {
      console.log(error)
    }
  }
  
  // if (loggedUser === User) {
  //   console.log("yeah, it is equal to null")
  // }


  return (
    <div>
      <h2>{quote.author}</h2>
      <h2>{quote.quote}</h2>
      <h2>{quote.category}</h2>
      <br />
      <h1>you are logged as : {loggedUser.username}</h1>
      <h1>with ID : {loggedUser.id}</h1>

      <Link to='/register'><button>register</button></Link>
      <Link to='/login'><button>login</button></Link>
      <button type="button" onClick={logOut}>logout</button>
    </div>
  );
};

export default Home;
