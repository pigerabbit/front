import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import * as Api from "api";

import ProductReviewCard from "./ProductReviewCard";
import ProductReviewForm from "./ProductReviewForm";

const ProductReviewTab = ({ product }) => {
  const { user } = useSelector((state) => state.user);

  const [reviews, setReviews] = useState([]);
  const [myReviews, setMyReviews] = useState([]);
  const [isWriting, setIsWriting] = useState(false);
  const [showMyReviews, setShowMyReviews] = useState(false);
  const [writable, setWritable] = useState(false);

  const isSeller = product.userId === user.id;

  const checkBuying = async () => {
    try {
      const check = await Api.get(`groups/productId/${product.id}`);
      const myBuying = check.data.payload
        .filter((v) => v.state === 5)
        .map((v) => v.participants)
        .reduce((prev, cur) => [...prev, ...cur])
        .filter((v) => (v) => v.userId === user.id);

      if (myBuying.length > 0 && myBuying.length > myReviews.length)
        setWritable(true);
      else setWritable(false);
    } catch (e) {
      console.log("구매 기록 get 실패");
    }
  };

  const getReviews = async () => {
    try {
      const res = await Api.get(`posts`, {
        receiver: product.id,
        type: "review",
      });
      setReviews(res.data.payload.filter((v) => v.type === "review"));
      setMyReviews(
        res.data.payload.filter(
          (v) => v.type === "review" && v.writer === user.id
        )
      );
      console.log(myReviews);
    } catch (e) {
      console.log(e);
    }
  };

  // 구매 이력이 있고, 후기를 쓴 적이 없으면 후기 작성하기 버튼 보여주기
  // myReviews 길이가 0이면 보여주지 않음.

  useEffect(() => {
    getReviews();
    checkBuying();
  }, []);

  return (
    <Container>
      {!isSeller &&
        writable &&
        (!isWriting ? (
          <WriteButton
            onClick={() => {
              setIsWriting((cur) => !cur);
            }}
          >
            후기 작성하기
          </WriteButton>
        ) : (
          <ProductReviewForm
            productId={product.id}
            setIsWriting={setIsWriting}
            setWritable={setWritable}
            setReviews={setReviews}
            setMyReviews={setMyReviews}
          />
        ))}
      <Review>
        <ReviewTop>
          <div id="reviewCount">
            후기 {showMyReviews ? myReviews.length : reviews.length}건
          </div>
          {myReviews.length > 0 && (
            <MyReviewButton
              onClick={() => {
                setShowMyReviews((cur) => !cur);
              }}
              showMyReviews={showMyReviews}
            >
              내 후기
            </MyReviewButton>
          )}
        </ReviewTop>
        {!showMyReviews
          ? reviews.map((v, i) => (
              <ProductReviewCard
                key={v.postId}
                postId={v.postId}
                writerId={v.writer}
                title={v.title}
                content={v.content}
                image={v.postImg}
                createdAt={v.createdAt}
                commentCount={v.commentCount}
                isSeller={isSeller}
              />
            ))
          : myReviews.map((v, i) => (
              <ProductReviewCard
                key={v.postId}
                postId={v.postId}
                writerId={v.writer}
                title={v.title}
                content={v.content}
                image={v.image}
                createdAt={v.createdAt}
                commentCount={v.commentCount}
              />
            ))}
      </Review>
    </Container>
  );
};

export default ProductReviewTab;

const Container = styled.div`
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

  #reviewCount {
    font-weight: bold;
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

  background-color: ${({ showMyReviews }) =>
    showMyReviews === true ? "#f0f0f0" : "#ffffff"};

  &:hover {
    background-color: #f0f0f0;
  }
`;
