import React, { useState, useEffect } from "react";
import styled, { css, keyframes } from "styled-components";
import * as Api from "api";

import ProductReplyForm from "./ProductReplyForm";
import ProductReplyEditForm from "./ProductReplyEditForm";
import ProductReplyCard from "./ProductReplyCard";
import ConfirmationPopup from "components/ConfirmationPopup";

const ProductInquiryCard = ({
  inquiry,
  onDeleteMyInquiry,
  isSeller,
  isMyInquiry,
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
  } = inquiry;

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
    if (e.target.id.includes("reply")) return;
    setOpen((cur) => !cur);
  };

  const handleDeleteButton = (e) => {
    e.stopPropagation();
    setIsOpenPopup((cur) => !cur);
  };

  const handleDeleteInquiry = async () => {
    try {
      const resDeleteInquiry = await Api.delete(`posts/${postId}`);
      if (resDeleteInquiry.data.success) {
        onDeleteMyInquiry(postId);
      }
      setIsOpenPopup(false);
    } catch (e) {
      console.log("문의 삭제 실패");
    }
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
      const res = await Api.get("posts", "", {
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
    if (commentCount > 0) getComments();
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
      >
        <Header open={open}>
          <InquiryTitle open={open} image={image}>
            {title}
          </InquiryTitle>
          <InquiryInfo>
            <ShowReplied isReplied={isReplied}>
              {isReplied ? "답변완료" : "미답변"}
            </ShowReplied>{" "}
            | {writer.name} | {date}
          </InquiryInfo>
          {isMyInquiry && (
            <span>
              {" | "}{" "}
              <DeleteButton onClick={handleDeleteButton}>삭제</DeleteButton>
            </span>
          )}
        </Header>

        {open && (
          <div>
            {isSeller && !showReply && !isReplied && (
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
            <Content isReplied={isReplied}>
              {content.split("\n").map((row, key) => (
                <div key={key}>{row}</div>
              ))}
            </Content>
          </div>
        )}

        {image && (
          <InquiryImg src={image} alt="문의 사진" open={open}></InquiryImg>
        )}

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
      <ConfirmationPopup
        handleButtonClick={handleDeleteInquiry}
        isOpenPopup={isOpenPopup}
        setIsOpenPopup={setIsOpenPopup}
        buttonContent={"삭제"}
      >
        <span>문의를 삭제하시겠습니까?</span>
        <span>삭제된 문의는 복구할 수 없습니다.</span>
      </ConfirmationPopup>
    </>
  );
};

export default ProductInquiryCard;

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
  margin: 2px 0;
  border-bottom: 1px solid #d0d0d0;
  padding-top: 30px;
  padding-bottom: 30px;
  background-color: ${({ open }) => (open ? "#f8f8fB" : "#ffffff")};
  cursor: pointer;

  animation: ${({ className }) =>
    className === "target" &&
    css`
      ${highlightAnimation} 1s linear
    `};

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

  span {
    font-size: 14px;
  }
`;

const InquiryTitle = styled.div`
  font-size: 15px;
  margin-right: ${({ open, image }) => (!open && image ? "115px" : "10px")};
  font-weight: ${({ open }) => (!open ? "normal" : "bold")};

  @media (max-width: 500px) {
    margin-right: 10px;
  }
`;

const InquiryInfo = styled.span`
  display: inline-block;
  font-size: 14px;
  margin-top: 15px;
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
