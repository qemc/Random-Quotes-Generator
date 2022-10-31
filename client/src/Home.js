import React from "react";
import { useEffect, useState } from "react";
import "./styles/Home.css";
import axios from "axios";
import { Link } from "react-router-dom";
import { User, Quot } from "./helpers/types";
import useCurrentUser from "./helpers/GetUser";
import Button from "./Button";

const api = axios.create({
  baseURL: "http://localhost:5000",
  withCredentials: true,
});

const Home = () => {
  const [quote, setQuote] = useState(Quot);
  const [liked, setLiked] = useState(false);
  const loggedUser = useCurrentUser();

  const get = () => {
    try {
      api.get("/").then((response) => {
        setQuote((quot) => ({
          author: response.data.author,
          category: response.data.category,
          quote: response.data.quote,
          is_liked: response.data.is_liked,
        }));
        setLiked(response.data.is_liked);
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(get, []);

  const logOut = () => {
    try {
      api.post("/logout");
      window.location.href = '/login'
    } catch (error) {
      console.log(error);
    }
  };

  const like = () => {
    setLiked(true);
    api.post("/like");
  };

  const next = () => {
    get();
  };

  return (
    <div>
      <div>
        <h2 className="author">{quote.author}</h2>
        <h2 className="quote">{quote.quote}</h2>
        <h2 className="category">{quote.category}</h2>
        <br />
        <h1>you are logged as : {loggedUser.username}</h1>
        <h1>with ID : {loggedUser.id}</h1>
        <Button
            onClick={logOut}
            type="button"
            buttonStyle="btn--warning--solid"
            buttonSize="btn--medium"
          >
            logout
          </Button>
        <Button
            onClick={like}
            type="button"
            buttonStyle="btn--success--outline"
            buttonSize="btn--medium"
          >
            like this quote
          </Button>
        <Button
            onClick={next}
            type="button"
            buttonStyle="btn--primary--solid"
            buttonSize="btn--medium"
          >
            next quote
          </Button>
        <Link to={"/liked"}>
          <Button
            type="button"
            buttonStyle="btn--primary--outline"
            buttonSize="btn--medium"
          >
            view liked quotes
          </Button>
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
    </div>
  );
};

export default Home;
