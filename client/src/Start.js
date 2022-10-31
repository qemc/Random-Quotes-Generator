import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import Button from "./Button";
import "./styles/Start.css";

const Start = () => {
  return (
    <div className="container-starting-page">
      <form className="starting-form">
        <h1>WELECOME</h1>
        <div>
          <Link className="btns" to="/register">
            <Button
              type="button"
              buttonStyle="btn--primary--outline"
              buttonSize="btn--medium"
              className="btns"
            >
              Register
            </Button>
          </Link>
          <Link className="btns" to="/login">
            <Button
              type="button"
              buttonStyle="btn--warning--solid"
              buttonSize="btn--medium"
              className="btns"
            >
              Login
            </Button>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Start;
