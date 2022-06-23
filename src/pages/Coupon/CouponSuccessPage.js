import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import * as Api from "api";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

const CouponSuccessPage = ({ group, quantity }) => {
  const [businessName, setBusinessName] = useState("");

  const product = group.productInfo;

  const getBusinessName = async () => {
    try {
      const resSeller = await Api.get(`users/${product.userId}`);
      const seller = resSeller.data.payload;
      setBusinessName(seller.business[0].businessName);
    } catch (e) {
      console.log("사업장 이름 get 실패");
    }
  };
  useEffect(() => {
    getBusinessName();
  }, []);

  return (
    <Container>
      <Result>이용권 사용이 확인되었습니다.</Result>
      <div id="roundIcon">
        <FontAwesomeIcon icon={faCheck} />
      </div>
      {businessName && (
        <GroupInfo>
          <h2>{product.name}</h2>
          <img src={product.images} alt={product.name + " 사진"} />
          <p id="businessName">
            <span className="emphasize">{businessName} </span>의 이용권 입니다.
          </p>
          <br />
          <p className="emphasize">공구명: {group.groupName}</p>
          <p className="emphasize">
            상품 수량: <span id="quantity">{quantity}</span>개
          </p>
        </GroupInfo>
      )}
    </Container>
  );
};

export default CouponSuccessPage;

const popupAnimation = keyframes`
  0% {
    top:-30px;
  }
  20% {
    top:0px;
  }
  100% {
    top:0px;
  }
`;

const Container = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  #roundIcon {
    width: 100px;
    height: 100px;
    background-color: #ffb564;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    z-index: 5;

    > svg {
      width: 50px;
      height: 50px;
      color: #ffffff;
    }
  }

  animation: ${popupAnimation} 2s alternate;
`;

const Result = styled.p`
  font-size: 30px;
  font-weight: bold;
  margin-bottom: 10px;

  @media (max-width: 500px) {
    font-size: 25px;
  }
`;

const GroupInfo = styled.div`
  width: 550px;
  height: 650px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 7px solid #ffb564;
  border-radius: 10px;
  padding-top: 10px;
  margin-top: -50px;

  h2 {
    margin-bottom: 15px;
  }

  > img {
    width: auto;
    height: 300px;
    margin-bottom: 15px;
    border-radius: 10px;
  }

  > p {
    font-size: 18px;
    margin-bottom: 7px;
  }

  .emphasize {
    font-size: 20px;
    font-weight: bold;
  }

  #businessName {
    color: #636363;
  }

  #quantity {
    color: #f79831;
  }

  @media (max-width: 500px) {
    width: 90%;
    height: 530px;

    > img {
      height: 280px;
    }
  }
`;
