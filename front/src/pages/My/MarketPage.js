import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";

import MyPageLayout from "./MyPageLayout";
import ProductCard from "./ProductCard";

const MarketPage = () => {
  return (
    <MyPageLayout pageName={"판매처 이름"}>
      <Container>
        <SaleButton>
          <FontAwesomeIcon icon={faCirclePlus} />
          판매 등록하기
        </SaleButton>

        <TotalNumber>총 3개</TotalNumber>

        <ProductCard></ProductCard>
      </Container>
    </MyPageLayout>
  );
};

export default MarketPage;

const Container = styled.div`
  border: solid 2px green;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SaleButton = styled.div`
  position: relative;
  cursor: pointer;
  margin-top: 10px;
  width: 30%;
  background-color: #ffb564;
  color: white;
  border-radius: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.2);

  font-size: 2.8vw;
  padding: 2.5vw;
  @media (min-width: 770px) {
    font-size: 22px;
    padding: 20px;
  }

  > svg {
    position: absolute;
    font-size: 4vw;
    left: 2vw;
    @media (min-width: 770px) {
      font-size: 32px;
      left: 15px;
    }
  }
`;

const TotalNumber = styled.div`
  border: solid 2px red;
  width: 90%;
  max-width: 550px;
  margin-top: 10px;
  font-size: 2.5vw;
  @media (min-width: 620px) {
    font-size: 16px;
  }
`;
