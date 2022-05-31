import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import * as Api from "api";

import MyPageLayout from "./MyPageLayout";
import ProductCard from "./ProductCard";
import ConfirmationPopup from "./ConfirmationPopup";

const MarketPage = () => {
  const [isOpenPopup, setIsOpenPopup] = useState(false);
  // const [products, setProducts] = useState([]);

  // const getProductData = async () => {
  //   const data = Api.get("markets", "bac0461f-5def-41bd-a74d-5d11ec91dd7c");
  //   console.log(data);
  // };

  // useEffect(() => {
  //   getProductData();
  // }, []);

  return (
    <MyPageLayout pageName={"판매처 이름"}>
      <Container>
        <SaleButton>
          <FontAwesomeIcon icon={faCirclePlus} />
          판매 등록하기
        </SaleButton>

        <TotalNumber>총 3개</TotalNumber>

        <ProductCard setIsOpenPopup={setIsOpenPopup}></ProductCard>
        <ProductCard setIsOpenPopup={setIsOpenPopup}></ProductCard>
        <ProductCard setIsOpenPopup={setIsOpenPopup}></ProductCard>
        <ProductCard setIsOpenPopup={setIsOpenPopup}></ProductCard>
        <ProductCard setIsOpenPopup={setIsOpenPopup}></ProductCard>
        <ProductCard setIsOpenPopup={setIsOpenPopup}></ProductCard>
      </Container>

      <ConfirmationPopup
        handleClickButton={() => console.log("hi")}
        isOpenPopup={isOpenPopup}
        setIsOpenPopup={setIsOpenPopup}
      >
        <ConfirmationContent>
          <span>판매를 정말 중지하시겠습니까?</span>
          <span>현재 오픈된 공동구매들은 모두 취소됩니다.</span>
        </ConfirmationContent>
      </ConfirmationPopup>
    </MyPageLayout>
  );
};

export default MarketPage;

const Container = styled.div`
  box-sizing: border-box;
  padding-bottom: 80px;
  @media (max-width: 440px) {
    padding-bottom: 70px;
  }
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

  font-size: 2.5vw;
  padding: 2.5vw;
  @media (min-width: 770px) {
    font-size: 20px;
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
  width: 90%;
  max-width: 550px;
  margin-top: 10px;
  font-size: 2.5vw;
  @media (min-width: 620px) {
    font-size: 16px;
  }
`;

const ConfirmationContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 8vw;
  font-size: 3.5vw;
  line-height: 5vw;
  @media (min-width: 600px) {
    margin-top: 45px;
    font-size: 22px;
    line-height: 30px;
  }
`;
