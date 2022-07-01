import React, { useEffect, useState } from "react";
import styled from "styled-components";
import * as Api from "api";

import ProductReviewCard from "./ProductReviewCard";
import ProductReviewForm from "./ProductReviewForm";
import LoadingSpinner from "components/LoadingSpinner";

const ProductReviewTab = ({
  product,
  user,
  targetPostId,
  isSeller,
  targetGroupId,
}) => {
  const [reviews, setReviews] = useState([]);
  const [myReviews, setMyReviews] = useState([]);
  const [isWriting, setIsWriting] = useState(false);
  const [showMyReviews, setShowMyReviews] = useState(false);
  const [writable, setWritable] = useState(false);

  const [loading, setLoading] = useState(false);

  const findReview = (postId) => {
    const review = reviews.find((review) => review.postId === postId);
    return review;
  };

  const hasReview = (postId) => {
    return Boolean(findReview(postId));
  };

  const handleDeleteMyReview = (postId) => {
    if (!hasReview(postId)) return;

    const remainedReviews = reviews.filter(
      (review) => review.postId !== postId
    );
    const remainedMyReviews = myReviews.filter(
      (myReview) => myReview.postId !== postId
    );

    setReviews(remainedReviews);
    setMyReviews(remainedMyReviews);
  };

  const checkWritable = (targetGroupId, myReviews) => {
    const writtenReview = myReviews.find(
      (myReview) => myReview.groupId === targetGroupId
    );
    if (Boolean(writtenReview)) setWritable(false);
    else setWritable(true);

    setLoading(false);
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
      return productReviews.filter((review) => review.writer === user.id);
    } catch (e) {
      console.log("후기 get 실패");
    }
  };

  useEffect(() => {
    setLoading(true);
    getReviews().then((myReviews) => {
      if (targetGroupId) checkWritable(targetGroupId, myReviews);
      else setLoading(false);
    });
  }, []);

  return (
    <Container>
      {loading ? (
        <div id="loader">
          <LoadingSpinner />
        </div>
      ) : (
        <>
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
                setReviews={setReviews}
                setMyReviews={setMyReviews}
                targetGroupId={targetGroupId}
                setWritable={setWritable}
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
              ? reviews.map((review) => (
                  <ProductReviewCard
                    key={review.postId}
                    review={review}
                    onDeleteMyReview={handleDeleteMyReview}
                    isSeller={isSeller}
                    isMyReview={review.writer === user.id}
                    targetPostId={targetPostId}
                    targetGroupId={targetGroupId}
                  />
                ))
              : myReviews.map((review) => (
                  <ProductReviewCard
                    key={review.postId}
                    review={review}
                    onDeleteMyReview={handleDeleteMyReview}
                    isMyReview={review.writer === user.id}
                    targetPostId={targetPostId}
                    targetGroupId={targetGroupId}
                  />
                ))}
          </Review>
        </>
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

  #loader {
    width: 100%;
    position: absolute;
    top: 45%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
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
