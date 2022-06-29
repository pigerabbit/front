import React, { useEffect, useState } from "react";
import styled from "styled-components";
import * as Api from "api";

import ProductReviewCard from "./ProductReviewCard";
import ProductReviewForm from "./ProductReviewForm";

const ProductReviewTab = ({ product, user, targetPostId, isSeller }) => {
  const [reviews, setReviews] = useState([]);
  const [myReviews, setMyReviews] = useState([]);
  const [isWriting, setIsWriting] = useState(false);
  const [showMyReviews, setShowMyReviews] = useState(false);
  const [writable, setWritable] = useState(false);
  const [isReviewFetched, setIsReviewFetched] = useState(false);

  const checkBuyingRecord = async () => {
    try {
      const resGroups = await Api.get(`groups/productId/${product.id}`);
      const joinedGroups = resGroups.data.payload
        .filter(
          (group) =>
            group.state === 1 ||
            (group.state === 1 && group.groupType === "coupon")
        )
        .map((group) => group.participants)
        .reduce((addedParticipants, participants) => [
          ...addedParticipants,
          ...participants,
        ])
        .filter((participant) => participant.userId === user.id);

      return joinedGroups;
    } catch (e) {
      return null;
    }
  };

  const checkWritable = async () => {
    try {
      const joinedGroups = await checkBuyingRecord();
      if (joinedGroups.length > 0 && joinedGroups.length > myReviews.length)
        setWritable(true);
      else setWritable(false);
    } catch (e) {
      setWritable(false);
    }
  };

  const handleDeleteMyReview = (postId) => {
    const remainedReviews = reviews.filter(
      (review) => review.postId !== postId
    );
    const remainedMyReviews = myReviews.filter(
      (myReview) => myReview.postId !== postId
    );

    if (remainedReviews.length !== 0 && remainedMyReviews.length !== 0) {
      setIsReviewFetched(false);
      setReviews(remainedReviews);
      setMyReviews(remainedMyReviews);
      setIsReviewFetched(true);
    }
  };

  const getReviews = async () => {
    try {
      const res = await Api.get(`posts`, "", {
        receiver: product.id,
        type: "review",
      });
      const productReviews = res.data.payload;
      setReviews(productReviews);
      setMyReviews(
        productReviews.filter((review) => review.writer === user.id)
      );
      setIsReviewFetched(true);
    } catch (e) {
      console.log("후기 get 실패");
    }
  };

  useEffect(() => {
    getReviews();
  }, []);

  useEffect(() => {
    checkWritable();
  }, [isReviewFetched]);

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
      {isReviewFetched && (
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
            ? reviews.map((review) => (
                <ProductReviewCard
                  key={review.postId}
                  review={review}
                  onDeleteMyReview={handleDeleteMyReview}
                  isSeller={isSeller}
                  isMyReview={review.writer === user.id}
                  targetPostId={targetPostId}
                />
              ))
            : myReviews.map((review) => (
                <ProductReviewCard
                  key={review.postId}
                  review={review}
                  onDeleteMyReview={handleDeleteMyReview}
                  isMyReview={review.writer === user.id}
                  targetPostId={targetPostId}
                />
              ))}
        </Review>
      )}
    </Container>
  );
};

export default ProductReviewTab;

const Container = styled.div`
  width: 100%;
  min-width: 360px;
  max-width: 770px;
  background-color: #ffffff;
  padding: 7px 0;
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
