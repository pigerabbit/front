import React, { useState } from "react";
import styled, { keyframes } from "styled-components";
import { useNavigate } from "react-router-dom";

const BuyingProductWindow = ({
  group,
  salePrice,
  remainedPersonnel,
  setShowBuyingProduct,
}) => {
  const navigate = useNavigate();

  const [quantity, setQuantity] = useState(1);

  const onChange = (e) => {
    if (e.target.value === 0) setQuantity(1);
    setQuantity(
      e.target.value > remainedPersonnel ? remainedPersonnel : e.target.value
    );
  };

  return (
    <Container>
      <CardContainer>
        <div id="cancel">
          <Cancel
            onClick={() => {
              setShowBuyingProduct(false);
            }}
          />
        </div>
        <div id="quantity">
          <Quantity>
            <button
              onClick={() => {
                setQuantity((cur) => (cur === 1 ? cur : cur - 1));
              }}
            >
              -
            </button>
            <input
              type="number"
              value={quantity}
              onChange={onChange}
              onKeyPress={(event) => {
                if (!/[0-9]/.test(event.key)) {
                  event.preventDefault();
                } else if (event.key === "0" && quantity === "") {
                  setQuantity(1);
                  event.preventDefault();
                }
              }}
            />
            <button
              onClick={() => {
                setQuantity((cur) =>
                  cur === remainedPersonnel ? cur : cur + 1
                );
              }}
            >
              +
            </button>
          </Quantity>
        </div>
        <div id="result">
          <ShowQuantity>
            총 구매수량 <p>{quantity}</p>개
          </ShowQuantity>
          <Total>합계 {(quantity * salePrice).toLocaleString()}원</Total>
        </div>
        <Button
          onClick={() => {
            navigate("/group/join/pay", {
              state: {
                data: { group, count: quantity },
              },
            });
          }}
        >
          구매하기
        </Button>
      </CardContainer>
    </Container>
  );
};

export default BuyingProductWindow;

const PopupAnimation = keyframes`
  from{
    transform: translateY(50%);
  }
  to{
    transform: none;
  }
`;

const Container = styled.div`
  position: fixed;
  width: 100%;
  max-width: 770px;
  min-width: 360px;
  min-height: 100vh;
  top: 0;
  margin: 0 auto;
  z-index: 10;
`;

const CardContainer = styled.div`
  background: #ffffff;
  border-radius: 10px 10px 0 0;
  width: 100%;
  max-width: 770px;
  min-width: 360px;
  height: 250px;
  position: fixed;
  z-index: 10;
  bottom: 0;
  animation: ${PopupAnimation} 0.7s ease-in-out;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.15);

  #quantity {
    width: 90%;
    margin: 0 auto;
  }

  #result {
    width: 90%;
    margin: 30px auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
`;

const Cancel = styled.div`
  width: 50px;
  height: 50px;
  opacity: 0.8;
  cursor: pointer;

  :before,
  :after {
    position: absolute;
    right: 30px;
    top: 15px;
    content: " ";
    height: 30px;
    width: 2px;
    background-color: #000;
  }
  :before {
    transform: rotate(45deg);
  }
  :after {
    transform: rotate(-45deg);
  }
`;

const Quantity = styled.div`
  width: 114px;
  height: 34px;
  display: flex;
  flex-direction: row;
  align-items: center;

  background-color: gray;
  border-top: 1px solid #dde0e3;
  border-bottom: 1px solid #dde0e3;

  > button {
    width: 34px;
    height: 100%;
    background-color: #f1f2f4;
    font-size: 20px;
    cursor: pointer;
    border: none;
    border-right: 1px solid #dde0e3;
    border-left: 1px solid #dde0e3;
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

const ShowQuantity = styled.div`
  font-size: 18px;
  font-weight: bold;
  color: #000000;
  > p {
    display: inline-block;
    color: #f79831;
  }
`;

const Total = styled.div`
  font-size: 20px;
  color: #000000;
`;

const Button = styled.div`
  width: 90%;
  height: 65px;
  margin: 10px auto;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  cursor: pointer;
  font-weight: bold;
  background-color: #f79831;
  color: #ffffff;

  &:hover {
    background-color: #636363;
  }
`;
