import React, { useState, useEffect } from "react";
import styled from "styled-components";
import * as Api from "api";
import axios from "axios";

import ProductReplyForm from "./ProductReplyForm";
import ProductCommentCard from "./ProductCommentCard";

const ProductInquiryCard = ({
  writerId,
  title,
  content,
  image,
  createdAt,
  commentCount,
  postId,
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
      console.log("글쓴이 못 불러옴");
    }
  };

  const getComments = async () => {
    try {
      const res = await axios.get(
        Api.serverUrl + `posts?receiver=${postId}&type=comment`
      );
      setComment(res.data.payload[0]);
    } catch (e) {
      console.log("댓글 못 불러옴");
    }
  };

  useEffect(() => {
    getWriter();
    if (commentCount > 0) getComments();
  }, []);

  return (
    <>
      <Container onClick={showDetail} open={open} image={image}>
        <Header open={open}>
          <div id="inquiryTop">
            <InquiryTitle open={open} image={image}>
              {title}
            </InquiryTitle>
            <InquiryInfo>
              <ShowReplied isReplied={isReplied}>
                {isReplied ? "답변완료" : "미답변"}
              </ShowReplied>{" "}
              | {writer.name} | {date}
            </InquiryInfo>
          </div>
        </Header>

        {open && (
          <div>
            {!showReply && !isReplied && (
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
            <Content isReplied={isReplied}>{content}</Content>
          </div>
        )}

        {image && (
          <InquiryImg src={image} alt="문의 사진" open={open}></InquiryImg>
        )}

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
                />
              </div>
            )}
            {isReplied && (
              <ProductCommentCard
                createdAt={comment.createdAt}
                content={comment.content}
              />
            )}
          </div>
        )}
      </Container>
    </>
  );
};

export default ProductInquiryCard;

const Container = styled.div`
  position: relative;
  width: 100%;
  margin: 2px 0;
  border-bottom: 1px solid #d0d0d0;
  padding-top: 30px;
  padding-bottom: 30px;
  background-color: ${({ open }) => (open ? "#f8f8fB" : "#ffffff")};
  cursor: pointer;

  #replyButton {
    position: absolute;
    right: 20px;
    width: 70px;
    height: 30px;
    color: #ffffff;
    border: none;
    background-color: #ababab;
  }
`;

const Header = styled.div`
  font-size: 16px;
  color: #636363;
  padding-bottom: ${({ open }) => (!open ? "0px" : "20px")};
  margin: 0 20px 0 20px;
  border-bottom: ${({ open }) => (!open ? "none" : "1px solid #636363")};
`;

const InquiryTitle = styled.div`
  font-size: 15px;
  margin-right: ${({ open, image }) => (!open && image ? "115px" : "10px")};
  font-weight: ${({ open }) => (!open ? "normal" : "bold")};

  @media (max-width: 500px) {
    margin-right: 10px;
  }
`;

const InquiryInfo = styled.div`
  display: inline-block;
  font-size: 14px;
  margin-top: 15px;
`;

const ShowReplied = styled.p`
  display: inline-block;
  font-weight: bold;
  color: ${({ isReplied }) => (isReplied ? "#f79831" : "#636363")};
`;

const Content = styled.div`
  position: relative;
  margin: ${({ isReplied }) => (isReplied ? "20px" : "20px 90px 20px 20px")};
  margin-top: 20px;
  font-size: 15px;
`;

const InquiryImg = styled.img`
  width: ${({ open }) => (!open ? "60px" : "150px")};
  height: ${({ open }) => (!open ? "60px" : "auto")};
  border-radius: 10px;
  margin-bottom: ${({ open }) => (!open ? "0px" : "20px")};
  position: ${({ open }) => (!open ? "absolute" : "relative")};
  top: ${({ open }) => (!open ? "20px" : "0px")};
  right: 10px;
  margin-left: ${({ open }) => (!open ? "auto" : "25px")};
  align-items: center;
`;
