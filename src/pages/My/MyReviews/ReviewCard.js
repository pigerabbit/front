import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import * as Api from 'api';

import ConfirmationPopup from '../ConfirmationPopup';

const ReviewCard = ({ review, onDeleteReview }) => {
  const [isOpenPopup, setIsOpenPopup] = useState(false);

  const navigate = useNavigate();

  const getDate = (date) => {
    return `${date.slice(0, 4)}.${date.slice(5, 7)}.${date.slice(8, 10)}`;
  };

  const handleCardClick = () => {
    navigate(`/products/${review.receiver}`);
  };

  const handleDelete = async () => {
    try {
      await Api.delete('/posts', review.postId);

      onDeleteReview(review.postId);
    } catch (e) {
      // 에러처리
    }
  };

  return (
    <Container>
      <Content onClick={handleCardClick}>
        <Title>{review.title}</Title>
        <Date>{getDate(review.createdAt)}</Date>
        {review.postImg && <Image url={review.postImg} />}
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
        buttonContent='삭제'
        handleButtonClick={handleDelete}
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

  &:active {
    background-color: #fafafa;
    > div:first-child {
      background-color: #fafafa;
    }
  }
`;

const Content = styled.div`
  cursor: pointer;
  z-index: 2;
  background-color: white;
  cursor: pointer;
  position: relative;
  width: 85%;
  max-width: 550px;

  display: flex;
  flex-direction: column;

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

const Image = styled.div`
  width: 70%;
  height: 52vw;
  max-height: 340px;
  margin-left: 15%;
  margin-bottom: 10px;
  box-shadow: 0 0 8px #f3f3f3;

  background-image: url(${({ url }) => url});
  background-size: cover;
  background-position: center;
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
