import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import * as Api from "api";

import MyPageLayout from "../MyPageLayout";
import ReviewCard from "./ReviewCard";
import LoadingSpinner from "components/LoadingSpinner";

const ReviewsPage = () => {
  const { user } = useSelector((state) => state.user);
  const [isLoading, setIsLoading] = useState(true);
  const [reviews, setReviews] = useState([]);

  const deleteReview = (id) => {
    const index = reviews.findIndex((review) => review.postId === id);
    setReviews((cur) => {
      const copy = [...cur];
      copy.splice(index, 1);
      return copy;
    });
  };

  const getReviews = async () => {
    if (user) {
      try {
        const res = await Api.get("posts", `${user.id}/review`);
        setReviews(res.data.payload);
        setIsLoading(false);
      } catch (e) {
        // 에러처리
      }
    }
  };

  useEffect(() => {
    getReviews();
  }, [user]);

  return (
    <MyPageLayout pageName={"나의 후기"} previousPage="/mypage">
      {isLoading ? (
        <LoadingContainer>
          <LoadingSpinner />
        </LoadingContainer>
      ) : (
        <Container>
          {reviews.length > 0 && (
            <TotalNumber>총 {reviews.length}건</TotalNumber>
          )}

          {reviews.map((review) => (
            <ReviewCard
              review={review}
              deleteReview={deleteReview}
              key={review.postId}
            />
          ))}

          {reviews.length === 0 && (
            <NoReviewContainer>
              <img
                src={`${process.env.PUBLIC_URL}/images/noContent.svg`}
                alt="no nearby"
              />
              작성된 후기가 없습니다.
            </NoReviewContainer>
          )}
        </Container>
      )}
    </MyPageLayout>
  );
};

export default ReviewsPage;

const LoadingContainer = styled.div`
  width: 100%;
  height: 80vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Container = styled.div`
  padding-bottom: 80px;
  @media (max-width: 440px) {
    padding-bottom: 70px;
  }
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const TotalNumber = styled.div`
  width: 90%;
  max-width: 550px;
  margin-top: 15px;
  margin-bottom: 5px;
  font-size: 2.5vw;
  @media (min-width: 620px) {
    font-size: 16px;
  }
`;

const NoReviewContainer = styled.div`
  width: 100%;
  height: 80vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 3vw;
  @media (min-width: 650px) {
    font-size: 20px;
  }

  > img {
    width: 50%;
    margin-bottom: 5%;
  }
`;
