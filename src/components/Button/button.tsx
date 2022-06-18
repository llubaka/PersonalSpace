import React from "react";
import styled from "styled-components";

interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  disabled?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ children, ...props }) => {
  return <ButtonStyled {...props}>{children}</ButtonStyled>;
};

const ButtonStyled = styled.button<{ disabled?: boolean }>(({ disabled }) => {
  const notDisabledStyles = disabled
    ? {}
    : {
        transition: "all 0.3s ease-in-out",
        background: "#1abc9c",
        cursor: "pointer",
        "&:hover": {
          transform: "translateY(-3px)",
          boxShadow: "0 6px 6px 0 rgba(0,0,0,0.2)",
        },
      };
  return {
    border: "none",
    cursor: "not-allowed",
    borderRadius: "3px",
    padding: "6px",
    background: "silver",
    marginBottom: "10px",
    width: "200px",
    color: "white",
    marginLeft: "25px",
    boxShadow: "0 3px 6px 0 rgba(0,0,0,0.2)",
    ...notDisabledStyles,
  };
});
