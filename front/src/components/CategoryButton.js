import React from "react";
import styled from "styled-components";

const CategoryButton = ({ handleClick, color = "white" }) => {
  return (
    <Button onClick={handleClick} color={color}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </Button>
  );
};

export default CategoryButton;

const Button = styled.div`
  cursor: pointer;
  width: 28px;
  height: 28px;
  display: grid;
  grid-template-columns: repeat(2, 15px);
  grid-template-rows: repeat(2, 15px);
  grid-gap: 2px;

  div {
    width: 11.5px;
    height: 11.5px;
    background-color: ${({ color }) => color};
    box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.15);
  }
`;
