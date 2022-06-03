import React, { useEffect, useState } from "react";
import styled from "styled-components";
import * as Api from "api";

import MyPageLayout from "../MyPageLayout";
import ReviewCard from "./ReviewCard";
import { useSelector } from "react-redux";

const ReviewsPage = () => {
  const { user } = useSelector((state) => state.user);
  const [reviews, setReviews] = useState([]);

  const getReviews = async () => {
    const res = await Api.get("posts", `${user.id}/review`);
    setReviews(res.data.payload);
  };

  useEffect(() => {
    getReviews();
  }, []);

  return (
    <MyPageLayout pageName={"나의 후기"}>
      <Container>
        <TotalNumber>총 3건</TotalNumber>

        {reviews.map((review) => (
          <ReviewCard review={review} key={review.postId} />
        ))}
      </Container>
    </MyPageLayout>
  );
};

export default ReviewsPage;

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
