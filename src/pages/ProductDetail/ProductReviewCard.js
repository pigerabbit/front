import React, { useState, useEffect } from "react";
import styled from "styled-components";
import * as Api from "api";

import ProductReplyForm from "./ProductReplyForm";
import ProductCommentCard from "./ProductCommentCard";

const ProductReviewCard = ({
  postId,
  writerId,
  title,
  content,
  image,
  createdAt,
  commentCount,
  isSeller,
}) => {
  const [writer, setWriter] = useState({});
  const [comment, setComment] = useState({});

  const [open, setOpen] = useState(false);
  const [showReply, setShowReply] = useState(false);
  const [isReplied, setIsReplied] = useState(commentCount > 0 ? true : false);
  const date = createdAt.split("T")[0];

  const showDetail = (e) => {
    if (e.target.id.includes("reply")) return;
    setOpen((cur) => !cur);
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

  return (
    <Container
      onClick={showDetail}
      open={open}
      image={image}
      isReplied={isReplied}
      isSeller={isSeller}
    >
      <Header mobile={isSeller && open && !showReply && !isReplied}>
        {/* <WriterImg src={writer.imageLink} alt="상세정보 사진"></WriterImg> */}
        <WriterImg>
          <img src={writer.imageLink} alt="사용자 사진" />
        </WriterImg>
        <div id="reviewTop">
          <ReviewTitle open={open} image={image}>
            {title}
          </ReviewTitle>
          <WriterInfo>
            {writer.name} | {date}
          </WriterInfo>
        </div>
      </Header>
      {isSeller && open && !showReply && !isReplied && (
        <button
          id="replyButton"
          onClick={(e) => {
            e.stopPropagation();
            setShowReply(true);
          }}
        >
          답변하기
        </button>
      )}
      <Content open={open} image={image}>
        {content}
      </Content>
      {image && <ReviewImg src={image} alt="리뷰 사진" open={open}></ReviewImg>}

      {isReplied && !open && <CommentArrow />}
      {open && (
        <div>
          {showReply && !isReplied && (
            <div
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              <ProductReplyForm
                id="replyForm"
                postId={postId}
                setShowReply={setShowReply}
                setComment={setComment}
                setIsReplied={setIsReplied}
              />
            </div>
          )}
          {isReplied && (
            <ProductCommentCard
              createdAt={comment.createdAt}
              content={comment.content}
              reverse={!isSeller}
            />
          )}
        </div>
      )}
    </Container>
  );
};

export default ProductReviewCard;

const Container = styled.div`
  position: relative;
  width: 100%;
  margin: 2px auto;
  min-height: 130px;
  vertical-align: middle;
  border-bottom: 1px solid #d0d0d0;
  background-color: ${({ open, image, isReplied, isSeller }) =>
    open && (image || isReplied || isSeller) ? "#f8f8fB" : "#ffffff"};
  cursor: ${({ image, isReplied, isSeller }) =>
    image || isReplied || isSeller ? "pointer" : "default"};
  padding-bottom: ${({ open, isReplied }) =>
    open && isReplied ? "30px" : "0px"};

  @media (max-width: 500px) {
    cursor: default;
    background-color: ${({ open, isSeller }) =>
      open && isSeller ? "#f8f8fB" : "#ffffff"};
  }

  #replyButton {
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

const WriterImg = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #d0d0d0;
  box-shadow: 0.5px 0.5px 0.5px 0.5px #d0d0d0;
  position: absolute;

  img {
    width: 100%;
    height: 100%;
    max-width: 100%;
    max-height: 100%;
    border-radius: 50%;
    font-size: 10px;
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

const WriterInfo = styled.div`
  display: inline-block;
  margin-left: 50px;
  font-size: 14px;
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
