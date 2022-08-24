import React from "react";
import styled from "styled-components";

interface OrderButtonProps extends React.HTMLAttributes<HTMLButtonElement> {}

export const OrderButton: React.FC<OrderButtonProps> = ({ children, ...props }) => {
  return <ButtonStyled {...props}>{children}</ButtonStyled>;
};

const ButtonStyled = styled.button<{}>(({}) => {
  return {
    background: "#55c2da",
    border: "0px",
    color: "white",
    fontSize: "16px",
    padding: "5px 10px",
    borderRadius: "5px",
    "&:hover": {
      cursor: "pointer",
      background: "#5ecae2",
    },
  };
});
