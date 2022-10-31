import React from "react";
import "./styles/Button.css";
const STYLES = [
  "btn--primary--solid",
  "btn--warning--solid",
  "btn--danger--solid",
  "btn--success--solid",
  "btn--primary--outline",
  "btn--danger--outline",
  "btn--success--outline",
  "btn--warning--outline",
];

const SIZES = ["btn--medium", "btn--small"];

const Button = ({ onMouseOver, type, children, onClick, buttonStyle, buttonSize }) => {
  const checkButtonStyle = STYLES.includes(buttonStyle)
    ? buttonStyle
    : STYLES[0];

  const checkButtonSize = SIZES.includes(buttonSize) ? buttonSize : SIZES[0];

  return (
    <button
      className={`btn ${checkButtonStyle} ${checkButtonSize}`}
      onClick={onClick}
      type={type}
      onMouseOver={onMouseOver}
    >
      {children}
    </button>
  );
};

export default Button;
