import React from "react";
import styled from "styled-components";
import { ValidationState } from "../../utils/enums";

interface InputProps extends React.HTMLAttributes<HTMLInputElement> {
  value?: string | number;
  required?: boolean;
  name?: string;
  isValid: ValidationState;
}

export const Input: React.FC<InputProps> = ({ ...props }) => {
  return <InputStyled {...props} />;
};

const InputStyled = styled.input<{ isValid: ValidationState }>(({ isValid }) => {
  const textColor = isValid === ValidationState.NOT_VALID ? "red" : "darken(#1abc9c, 20%)";
  const placeholderColor = isValid === ValidationState.NOT_VALID ? "red" : "#1abc9c";

  const style: any = {
    margin: "40px 25px",
    width: "calc(100% - 50px)",
    display: "block",
    border: "none",
    padding: "12px 0",
    borderBottom: "solid 1px #1abc9c",
    transition: "all 0.3s cubic-bezier(.64,.09,.08,1)",
    background: "linear-gradient(to bottom, rgba(255,255,255,0) 96%, #1abc9c 4%)",
    backgroundPosition: "-100vw 0",
    backgroundRepeat: "no-repeat",
    color: textColor,
    "&::-webkit-input-placeholder": {
      color: placeholderColor,
      fontFamily: "roboto, sans-serif",
      transition: "all 0.3s ease-in-out",
    },
    "&:focus, &:valid": {
      boxShadow: "none",
      outline: "none",
      backgroundPosition: "0 0",
      "&::-webkit-input-placeholder": {
        color: placeholderColor,
        fontSize: "11px",
        transform: "translateY(-20px)",
        visibility: "visible !important",
      },
    },
  };

  return style;
});
