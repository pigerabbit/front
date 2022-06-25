import React, { useState } from "react";
import styled, { keyframes } from "styled-components";
import { useNavigate } from "react-router-dom";

import SetQuantityButtons from "components/SetQuantityButtons";

const BuyingProductWindow = ({
  group,
  salePrice,
  remainedPersonnel,
  setShowBuyingProduct,
}) => {
  const navigate = useNavigate();

  const [quantity, setQuantity] = useState(1);

  const clickCancel = () => setShowBuyingProduct(false);

  const clickBuying = () => {
    navigate("/group/join/pay", {
      state: {
        data: { group, count: quantity },
      },
    });
  };

  return (
    <CardContainer>
      <div id="cancel">
        <Cancel onClick={clickCancel} />
      </div>
      <div id="quantity">
        <SetQuantityButtons
          quantity={quantity}
          setQuantity={setQuantity}
          maxQuantity={remainedPersonnel}
        />
      </div>
      <div id="result">
        <ShowQuantity>
          총 구매수량 <p>{quantity}</p>개
        </ShowQuantity>
        <Total>합계 {(quantity * salePrice).toLocaleString()}원</Total>
      </div>
      <Button onClick={clickBuying}>구매하기</Button>
    </CardContainer>
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

const CardContainer = styled.div`
  position: fixed;
  width: 100%;
  max-width: 770px;
  min-width: 360px;
  height: 250px;

  background: #ffffff;
  border-radius: 10px 10px 0 0;
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
