import React from "react";
import styled from "styled-components";

const SetQuantityButtons = ({ quantity, setQuantity, maxQuantity }) => {
  const clickDecrease = () => setQuantity((cur) => (cur === 1 ? cur : cur - 1));

  const clickIncrease = () =>
    setQuantity((cur) => (cur === maxQuantity ? cur : cur + 1));

  const handleChange = (e) => {
    if (e.target.value === 0) setQuantity(1);
    else
      setQuantity(e.target.value > maxQuantity ? maxQuantity : e.target.value);
  };

  const handleKeyPress = (e) => {
    if (!/[0-9]/.test(e.key)) {
      e.preventDefault();
    } else if (e.key === "0" && quantity === "") {
      setQuantity(1);
      e.preventDefault();
    }
  };

  return (
    <Quantity>
      <button onClick={clickDecrease}>-</button>
      <input
        type="number"
        pattern="\d*"
        value={quantity}
        onChange={handleChange}
        onKeyPress={handleKeyPress}
      />
      <button onClick={clickIncrease}>+</button>
    </Quantity>
  );
};

export default SetQuantityButtons;

const Quantity = styled.div`
  width: fit-content;
  height: 34px;
  display: flex;
  flex-direction: row;
  align-items: center;

  border-top: 1px solid #dde0e3;
  border-bottom: 1px solid #dde0e3;

  > button {
    width: 34px;
    height: 100%;
    background-color: #f1f2f4;
    font-size: 20px;
    text-decoration: none;
    color: #636363;
    cursor: pointer;
    border: none;
    border-right: 1px solid #dde0e3;
    border-left: 1px solid #dde0e3;

    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
  }

  > input {
    width: 44px;
    text-align: center;
    line-height: 33px;
    margin: 0;
    font-weight: bold;
    font-size: 12px;
    border: none;
  }

  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  input[type="number"] {
    -moz-appearance: textfield;
  }
`;
