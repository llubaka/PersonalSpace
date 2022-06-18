import React from "react";
import styled from "styled-components";
import { ValidationState } from "../../utils/enums";

interface InputProps extends React.HTMLAttributes<HTMLInputElement> {
  value?: string | number;
  required?: boolean;
  name?: string;
  isValid: ValidationState;
  type?: string;
}

export const Input: React.FC<InputProps> = ({ ...props }) => {
  return <InputStyled {...props} />;
};

const InputStyled = styled.input<{ isValid: ValidationState }>(({ isValid }) => {
  const validColor = "#1abc9c";
  const notValidColor = "red";
  const stateStyle =
    isValid === ValidationState.NOT_VALID
      ? {
          textColor: notValidColor,
          placeholderColor: notValidColor,
          borderBottom: `solid 1px ${notValidColor}`,
          background: `linear-gradient(to bottom, rgba(255,255,255,0) 96%, ${notValidColor} 4%)`,
        }
      : {
          textColor: validColor,
          placeholderColor: validColor,
          borderBottom: `solid 1px ${validColor}`,
          background: `linear-gradient(to bottom, rgba(255,255,255,0) 96%, ${validColor} 4%)`,
        };

  const style: any = {
    margin: "40px 25px",
    width: "calc(100% - 50px)",
    display: "block",
    border: "none",
    padding: "12px 0",
    borderBottom: stateStyle.borderBottom,
    transition: "all 0.3s cubic-bezier(.64,.09,.08,1)",
    background: stateStyle.background,
    backgroundPosition: "-100vw 0",
    backgroundRepeat: "no-repeat",
    color: stateStyle.textColor,
    "&::-webkit-input-placeholder": {
      color: stateStyle.placeholderColor,
      fontFamily: "roboto, sans-serif",
      transition: "all 0.3s ease-in-out",
    },
    "&:focus, &:valid": {
      boxShadow: "none",
      outline: "none",
      backgroundPosition: "0 0",
      "&::-webkit-input-placeholder": {
        color: stateStyle.placeholderColor,
        fontSize: "11px",
        transform: "translateY(-20px)",
        visibility: "visible !important",
      },
    },
  };

  return style;
});
