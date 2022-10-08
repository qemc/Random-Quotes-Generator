import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const api = axios.create({
  baseURL: "http://localhost:5000",
  withCredentials: true,
});

const Home = () => {
  const quot = {
    author: String,
    category: String,
    quote: String,
  };

  const currentUser = {
    username: String,
    email: String,
    id: String,
  };

  const [quote, setQuote] = useState(quot);
  const [loggedUser, setLoggedUser] = useState(currentUser);

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

    try {
      api.get("/@me").then((response) => {
        setLoggedUser((quot) => ({
          username: response.data.username,
          email: response.data.email,
          id: response.data.id,
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

  console.log(quote);

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
