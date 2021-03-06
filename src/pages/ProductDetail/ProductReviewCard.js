import React, { useState, useEffect } from "react";
import styled, { css, keyframes } from "styled-components";
import * as Api from "api";

import ProductReplyForm from "./ProductReplyForm";
import ProductReplyEditForm from "./ProductReplyEditForm";
import ProductReplyCard from "./ProductReplyCard";
import ConfirmationPopup from "components/ConfirmationPopup";

const ProductReviewCard = ({
  review,
  onDeleteMyReview,
  isSeller,
  isMyReview,
  targetPostId,
}) => {
  const {
    postId,
    writer: writerId,
    title,
    content,
    postImg: image,
    createdAt,
    commentCount,
  } = review;

  const [writer, setWriter] = useState({});
  const [comment, setComment] = useState({});

  const [open, setOpen] = useState(false);
  const [showReply, setShowReply] = useState(false);
  const [isReplied, setIsReplied] = useState(commentCount > 0 ? true : false);
  const [isEditingReply, setIsEditingReply] = useState(false);
  const [isOpenPopup, setIsOpenPopup] = useState(false);
  const [isTargetPost, setIsTargetPost] = useState(targetPostId === postId);

  const date = createdAt.split("T")[0];

  if (targetPostId === postId) {
    const targetElement = document.querySelector(".target");
    if (targetElement) {
      targetElement.scrollIntoView({ block: "center" });
    }
  }

  const showDetail = (e) => {
    setOpen((cur) => !cur);
  };

  const handleDeleteButton = (e) => {
    e.stopPropagation();
    setIsOpenPopup((cur) => !cur);
  };

  const handleDeleteReview = async () => {
    try {
      const resDeleteReview = await Api.delete(`posts/${postId}`);
      if (resDeleteReview.data.success) {
        onDeleteMyReview(postId);
      }
      setIsOpenPopup(false);
    } catch (e) {
      console.log("후기 삭제 실패");
    }
  };

  const getWriter = async () => {
    try {
      const res = await Api.get(`users/${writerId}`);
      setWriter(res.data.payload);
    } catch (e) {
      console.log(e);
    }
  };

  const getComment = async () => {
    try {
      const res = await Api.get(`posts`, "", {
        receiver: postId,
        type: "comment",
      });
      setComment(res.data.payload[0]);
    } catch (e) {
      console.log("댓글 못 불러옴");
    }
  };

  useEffect(() => {
    getWriter();
    if (commentCount > 0) getComment();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsTargetPost(false);
    }, [1000]);
    return () => {
      clearTimeout(timer);
    };
  }, [isTargetPost]);

  return (
    <>
      <Container
        className={isTargetPost && "target"}
        onClick={showDetail}
        open={open}
        image={image}
        isReplied={isReplied}
        isSeller={isSeller}
      >
        <Header mobile={isSeller && open && !showReply && !isReplied}>
          <WriterImgContainer>
            <img src={writer.imageLink} alt="사용자 사진" />
          </WriterImgContainer>
          <ReviewTopContainer>
            <ReviewTitle open={open} image={image}>
              {title}
            </ReviewTitle>
            <span id="reviewInfo">
              {writer.name} | {date}
            </span>
            {isMyReview && (
              <span>
                {" | "}
                <DeleteButton onClick={handleDeleteButton}>삭제</DeleteButton>
              </span>
            )}
          </ReviewTopContainer>
        </Header>
        {isSeller && open && !showReply && !isReplied && (
          <ReplyButton
            onClick={(e) => {
              e.stopPropagation();
              setShowReply(true);
            }}
          >
            답변하기
          </ReplyButton>
        )}
        <Content open={open} image={image}>
          {content}
        </Content>
        {image && (
          <ReviewImg src={image} alt="리뷰 사진" open={open}></ReviewImg>
        )}

        {isReplied && !open && <CommentArrow />}
        {open && (
          <div
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            {showReply && !isReplied && (
              <ProductReplyForm
                postId={postId}
                setShowReply={setShowReply}
                setComment={setComment}
                setIsReplied={setIsReplied}
              />
            )}
            {isReplied &&
              (!isEditingReply ? (
                <div onClick={showDetail}>
                  <ProductReplyCard
                    createdAt={comment.createdAt}
                    content={comment.content}
                    isSeller={isSeller}
                    setIsEditingReply={setIsEditingReply}
                    reverseBackgroundColor={!isSeller}
                  />
                </div>
              ) : (
                <ProductReplyEditForm
                  postId={postId}
                  comment={comment}
                  setComment={setComment}
                  setIsEditingReply={setIsEditingReply}
                />
              ))}
          </div>
        )}
      </Container>
      {isOpenPopup && (
        <ConfirmationPopup
          handleButtonClick={handleDeleteReview}
          isOpenPopup={isOpenPopup}
          setIsOpenPopup={setIsOpenPopup}
          buttonContent={"삭제"}
        >
          <span>후기를 삭제하시겠습니까?</span>
          <span>삭제된 후기는 복구할 수 없습니다.</span>
        </ConfirmationPopup>
      )}
    </>
  );
};

export default ProductReviewCard;

const highlightAnimation = keyframes`
  0%{
    background-color: #feeaa1
  }
  100% {
    background-color: #ffffff
  }
`;

const Container = styled.div`
  position: relative;
  width: 100%;
  margin: 0 auto;
  min-height: 130px;
  vertical-align: middle;
  border-bottom: 1px solid #d0d0d0;
  background-color: ${({ open, image, isReplied, isSeller }) =>
    open && (image || isReplied || isSeller) ? "#f8f8fB" : "#ffffff"};
  cursor: ${({ image, isReplied, isSeller }) =>
    image || isReplied || isSeller ? "pointer" : "default"};
  padding-bottom: ${({ open, isReplied }) =>
    open && isReplied ? "30px" : "0px"};
  white-space: pre-wrap;

  animation: ${({ className }) =>
    className === "target" &&
    css`
      ${highlightAnimation} 1s linear
    `};

  @media (max-width: 500px) {
    cursor: default;
    background-color: ${({ open, isSeller }) =>
      open && isSeller ? "#f8f8fB" : "#ffffff"};
  }
`;

const Header = styled.div`
  font-size: 16px;
  color: #636363;
  padding: 20px 0 10px 20px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;

  @media (max-width: 500px) {
    margin-right: ${({ mobile }) => (mobile ? "80px" : "0px")};
  }
`;

const WriterImgContainer = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #d0d0d0;
  box-shadow: 0.5px 0.5px 0.5px 0.5px #d0d0d0;
  position: absolute;

  > img {
    width: 100%;
    height: 100%;
    max-width: 100%;
    max-height: 100%;
    border-radius: 50%;
    font-size: 10px;
  }
`;

const ReviewTopContainer = styled.div`
  > span {
    font-size: 14px;
  }
  #reviewInfo {
    margin-left: 50px;
  }
`;

const ReviewTitle = styled.div`
  font-size: 15px;
  font-weight: bold;
  margin-left: 50px;
  margin-right: ${({ open, image }) => (!open && image ? "115px" : "10px")};

  @media (max-width: 500px) {
    margin-right: 10px;
  }
`;

const DeleteButton = styled.button`
  border: none;
  background: none;
  color: #d3623b;
  padding: 0;
  font-size: 14px;

  &:hover {
    cursor: pointer;
    font-weight: bold;
  }
`;

const ReplyButton = styled.button`
  position: absolute;
  right: 20px;
  width: 70px;
  height: 30px;
  color: #ffffff;
  border: none;
  background-color: #ababab;
  @media (max-width: 500px) {
    top: 20px;
  }
`;

const Content = styled.div`
  margin: ${({ open, image }) =>
    !open && image ? "0 110px 20px 70px" : "0 20px 20px 70px"};
  font-size: 15px;
  display: flex;
  align-items: center;
  flex-direction: row;

  @media (max-width: 500px) {
    margin: 0 20px 20px 70px;
  }
`;

const ReviewImg = styled.img`
  width: ${({ open }) => (!open ? "85px" : "300px")};
  height: ${({ open }) => (!open ? "85px" : "auto")};
  border-radius: 10px;
  margin-bottom: ${({ open }) => (!open ? "0px" : "20px")};
  position: ${({ open }) => (!open ? "absolute" : "relative")};
  top: ${({ open }) => (!open ? "20px" : "0px")};
  right: 30px;
  margin-left: ${({ open }) => (!open ? "auto" : "80px")};
  align-items: center;

  @media (max-width: 500px) {
    width: 270px;
    height: auto;
    position: relative;
    top: 0px;
    margin: 0 0 20px 80px;
  }
`;

const CommentArrow = styled.i`
  border: solid black;
  border-width: 0 1px 1px 0;
  display: inline-block;
  padding: 5px;
  margin-left: 5px;
  transform: rotate(45deg);
  -webkit-transform: rotate(45deg);
  position: absolute;
  right: 10px;
  bottom: 20px;
`;
