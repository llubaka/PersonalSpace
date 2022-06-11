import React from "react";
import styled from "styled-components";

interface ButtonProps {
  children: React.ReactNode;
  color: string;
}
export const Button: React.FC<ButtonProps> = ({ children, color }) => {
  return <ButtonStyled color={color}>{children}</ButtonStyled>;
};

const ButtonStyled = styled.button<{ color: string }>((props) => {
  return {
    color: props.color,
    border: "1px",
    "&:hover": {
      background: "green",
    },
  };
});
