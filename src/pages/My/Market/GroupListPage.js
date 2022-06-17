import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import styled from "styled-components";
import * as Api from "api";

import MyPageLayout from "../MyPageLayout";

const GroupListPage = () => {
  const { user } = useSelector((state) => state.user);
  const { productId } = useParams();

  return (
    <MyPageLayout pageName={"공구 목록"} previousPage={-1}>
      <Container>
        {/* {products.length > 0 && ( */}
        <TotalNumber>총 {}개</TotalNumber>
        {/* )} */}

        {/* {products.map((product) => (
          <GroupCard
            product={product}
            SetCurrentProduct={SetCurrentProduct}
            setIsOpenPopup={setIsOpenPopup}
            key={product.id}
          />
        ))} */}
      </Container>

      {/* {products.length === 0 && (
        <NoContentContainer>
          <img
            src={`${process.env.PUBLIC_URL}/images/noSale.svg`}
            alt="no nearby"
          />
          오픈된 공동구매가 없습니다.
        </NoContentContainer>
      )} */}
    </MyPageLayout>
  );
};

export default GroupListPage;

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

const TotalNumber = styled.div`
  width: 90%;
  max-width: 550px;
  margin-top: 15px;
  font-size: 2.5vw;
  @media (min-width: 620px) {
    font-size: 16px;
  }
`;

const NoContentContainer = styled.div`
  margin-top: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 3vw;
  @media (min-width: 650px) {
    font-size: 20px;
  }

  > img {
    width: 50%;
    margin-bottom: 5%;
  }
`;
