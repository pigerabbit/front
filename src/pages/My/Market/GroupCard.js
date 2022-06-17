import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import styled from "styled-components";

import getDeadline from "utils/getDeadline";

const ProductCard = ({}) => {
  const { user } = useSelector((state) => state.user);

  const navigate = useNavigate();

  return (
    <Container>
      <Content onClick={() => {}}>
        <Title>
          <span>[{"택배공구"}]</span>
          <span>{"감자 공구해요!"}</span>
        </Title>

        <State>모집 성공</State>

        <Deadline>{getDeadline("2022-06-11 15:00:00")}</Deadline>
      </Content>

      <ButtonContainer>
        <PurchasersButton onClick={() => {}}>구매자 목록</PurchasersButton>
      </ButtonContainer>
    </Container>
  );
};

export default ProductCard;

const Container = styled.div`
  background-color: white;
  position: relative;
  margin-top: 7px;
  box-shadow: 0 3px 3px -3px #c7c7c7;
  width: 100%;
  display: flex;
  justify-content: center;

  > svg {
    z-index: 3;
    cursor: pointer;
    width: 5%;
    color: #aaaaaa;
    position: absolute;
    right: 10%;
    top: 15%;
    font-size: 3vw;
    transition: color 0.4s;

    &:hover {
      color: #ffb564;
    }
  }
`;

const Content = styled.div`
  z-index: 2;
  background-color: white;
  cursor: pointer;
  position: relative;
  width: 90%;
  max-width: 550px;
  margin: 3vw 0;
  @media (min-width: 620px) {
    margin: 18px 0;
  }
  display: flex;
  flex-direction: column;
`;

const Title = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 3.3vw;
  @media (min-width: 620px) {
    font-size: 21px;
  }

  > span {
    margin-bottom: 5px;
  }

  > span:first-child {
    font-size: 2.5vw;
    @media (min-width: 620px) {
      font-size: 16px;
    }
  }
`;

const State = styled.div`
  width: 12%;
  background-color: #ffb564;
  color: white;
  border-radius: 5px;
  font-size: 2.2vw;
  @media (min-width: 620px) {
    font-size: 13.5px;
  }
  text-align: center;
  padding: 1.4%;
  margin-top: 2%;
`;

const Deadline = styled.span`
  margin-top: 2%;
  color: #969696;
  font-size: 2.5vw;
  @media (min-width: 620px) {
    font-size: 16px;
  }
`;

const ButtonContainer = styled.div`
width 100%;
position: absolute;
width: 90%;
max-width: 550px;
bottom: 3vw;
@media (min-width: 620px) {
    bottom: 18px;
  }

display: flex;
justify-content: flex-end;
`;

const PurchasersButton = styled.button`
  width: 16%;
  max-width: 100px;
  z-index: 3;
  cursor: pointer;
  border: none;
  color: white;
  padding: 1.2%;
  background: #ffb564;
  box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.15);
  font-size: 2vw;
  @media (min-width: 620px) {
    font-size: 13px;
  }
`;
