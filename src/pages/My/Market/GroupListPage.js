import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import styled from "styled-components";
import * as Api from "api";

import MyPageLayout from "../MyPageLayout";
import GroupCard from "pages/My/Market/GroupCard";

const GroupListPage = () => {
  const { user } = useSelector((state) => state.user);
  const [groups, setGroups] = useState([]);
  const { productId } = useParams();

  const location = useLocation();

  return (
    <MyPageLayout pageName={"공구 목록"} previousPage={-1}>
      <Container>
        <ProductName>{location.state.productName}</ProductName>
        {/* {products.length > 0 && ( */}
        <TotalNumber>총 {}개</TotalNumber>
        {/* )} */}

        <GroupCard />
      </Container>

      {/* {groups.length === 0 && (
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

const ProductName = styled.div`
  box-sizing: border-box;
  width: calc(100% - 30px);
  background-color: white;
  box-shadow: 0 3px 3px -3px #c7c7c7;
  margin-top: 15px;
  padding: 2%;
  text-align: center;
  font-size: 3.3vw;
  @media (min-width: 620px) {
    font-size: 21px;
  }
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
