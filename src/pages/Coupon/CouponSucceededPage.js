import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import * as Api from "api";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

const CouponSucceededPage = ({ group, quantity }) => {
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
          <div>
            <p>공구명</p>
            <p className="emphasize">{group.groupName}</p>
          </div>
          <div>
            <p>상품 수량</p>
            <p className="emphasize">
              <span id="quantity">{quantity}</span>개
            </p>
          </div>
        </GroupInfo>
      )}
    </Container>
  );
};

export default CouponSucceededPage;

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
    width: 80px;
    height: 80px;
    background-color: #ffb564;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    z-index: 5;

    > svg {
      width: 40px;
      height: 40px;
      color: #ffffff;
    }
    @media (max-width: 500px) {
      width: 60px;
      height: 60px;

      > svg {
        width: 30px;
        height: 30px;
        color: #ffffff;
      }
    }
  }

  animation: ${popupAnimation} 2s alternate;
`;

const Result = styled.p`
  font-size: 30px;
  font-weight: bold;
  margin-bottom: 10px;

  @media (max-width: 500px) {
    font-size: 22px;
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
  padding-top: 30px;
  margin-top: -40px;

  > h2 {
    margin-bottom: 15px;
  }

  > img {
    width: auto;
    height: 300px;
    margin-bottom: 15px;
    border-radius: 10px;
  }

  > div {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-bottom: 15px;

    > p {
      margin-bottom: 5px;
    }
  }

  > p {
    font-size: 15px;
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
    margin-top: -30px;

    > img {
      height: 280px;
    }
  }
`;
