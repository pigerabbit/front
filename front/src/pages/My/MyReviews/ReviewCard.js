import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import ConfirmationPopup from "../ConfirmationPopup";

const ReviewCard = ({ review }) => {
  const [isOpenPopup, setIsOpenPopup] = useState(false);

  const getDate = (date) => {
    return `${date.slice(0, 4)}.${date.slice(5, 7)}.${date.slice(8, 10)}`;
  };

  return (
    <Container>
      <Content>
        <Title>논산에서 자란 신선한 딸기딸기</Title>
        <Date>{getDate(review.createdAt)}</Date>
        <Review>{review.content}</Review>
      </Content>

      <DeleteButton
        onClick={() => {
          setIsOpenPopup(true);
        }}
      >
        삭제
      </DeleteButton>

      <ConfirmationPopup
        isOpenPopup={isOpenPopup}
        setIsOpenPopup={setIsOpenPopup}
        buttonContent="삭제"
      >
        <ConfirmationContent>후기를 정말 삭제하시겠습니까?</ConfirmationContent>
      </ConfirmationPopup>
    </Container>
  );
};

export default ReviewCard;

const Container = styled.div`
  background-color: white;
  position: relative;
  margin-top: 7px;
  box-shadow: 0 3px 3px -3px #c7c7c7;
  width: 100%;
  display: flex;
  justify-content: center;
`;

const Content = styled.div`
  cursor: pointer;
  z-index: 2;
  background-color: white;
  cursor: pointer;
  position: relative;
  width: 85%;
  max-width: 550px;
  margin: 3.5vw 0;
  @media (min-width: 770px) {
    margin: 28px 0;
  }
`;

const Title = styled.div`
  margin-bottom: 8px;
  font-size: 3.5vw;
  @media (min-width: 620px) {
    font-size: 22px;
  }
`;

const Date = styled.div`
  margin-bottom: 15px;
  color: #606060;
  font-size: 2.6vw;
  @media (min-width: 620px) {
    font-size: 16px;
  }
`;

const Review = styled.div`
  font-size: 2.8vw;
  line-height: 3.8vw;
  @media (min-width: 620px) {
    font-size: 17.5px;
    line-height: 24px;
  }
`;

const DeleteButton = styled.div`
  z-index: 2;
  cursor: pointer;
  position: absolute;
  right: 5%;
  top: 12%;
  background-color: #f1f1f1;
  color: #434343;
  border-radius: 20px;
  font-size: 2.2vw;
  padding: 0.6vw 2vw;
  @media (min-width: 620px) {
    font-size: 13.5px;
    padding: 4px 13px;
  }
`;

const ConfirmationContent = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 10vw;
  font-size: 4vw;
  @media (min-width: 600px) {
    margin-top: 60px;
    font-size: 24px;
  }
`;
