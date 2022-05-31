import React, { useEffect, useState } from "react";
import styled from "styled-components";
import * as Api from "api";
import axios from "axios";

import ProductReviewCard from "./ProductReviewCard";

const ProductReviewTab = ({ product }) => {
  const [reviews, setReviews] = useState([]);
  const [myReviews, setMyReviews] = useState([]);
  const n = reviews.length;

  const getReviews = async () => {
    try {
      const res = await axios.get(`/data/reviews.json`);
      // const res = await Api.get(`posts?receiver=${product.id}`);
      // const resMyReview = await Api.get(`posts/`);
      setReviews(res.data.content);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getReviews();
  }, []);

  return (
    <Container>
      <WriteButton>후기 작성하기</WriteButton>
      <Review>
        <ReviewTop>
          <div id="reviewCount">후기 {n}건</div>
          <MyReviewButton>내 후기</MyReviewButton>
        </ReviewTop>
        {reviews.map((v, i) => (
          <ProductReviewCard
            writerId={v.writer}
            title={v.title}
            content={v.content}
            image={v.image}
            createdAt={v.createdAt}
            key={v.postId}
          />
        ))}
      </Review>
    </Container>
  );
};

export default ProductReviewTab;

const Container = styled.div`
  position: relative;
  width: 100%;
  min-width: 360px;
  max-width: 770px;
  background-color: #ffffff;
  margin-top: 7px;
`;

const WriteButton = styled.div`
  border: 1px solid #636363;
  border-radius: 10px;
  width: 90%;
  height: 50px;
  margin: 25px auto;
  font-size: 16px;
  font-weight: bold;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  &:hover {
    background-color: #f0f0f0;
  }
`;

const Review = styled.div`
  width: 90%;
  margin: 20px auto;
`;

const ReviewTop = styled.div`
  padding-bottom: 20px;
  border-bottom: 2px solid #000000;
  display: flex;
  flex-direction: row;
  align-items: center;

  .reviewCount {
    font-weight: bold;
    position: absolute;
    left: 5%;
  }
`;

const MyReviewButton = styled.div`
  position: absolute;
  right: 5%;
  width: 80px;
  height: 20px;
  border: 1px solid #d0d0d0;
  border-radius: 5px;
  box-shadow: 0.5px 0.5px 0.5px 0.5px #d0d0d0;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  font-size: 13px;
  cursor: pointer;
`;
