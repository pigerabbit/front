import React from "react";
import styled from "styled-components";

const CategoryButton = ({ handleClick }) => {
  return (
    <Button onClick={handleClick}>
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
  margin-left: 30px;
  width: 30px;
  height: 30px;
  display: grid;
  grid-template-columns: repeat(2, 15px);
  grid-template-rows: repeat(2, 15px);
  grid-gap: 4px;

  div {
    width: 13px;
    height: 13px;
    background-color: white;
    box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.15);
  }
`;
