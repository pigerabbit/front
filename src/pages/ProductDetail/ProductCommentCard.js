import React from "react";
import styled from "styled-components";

const ProductCommentCard = ({
  createdAt,
  content,
  reverseBackgroundColor = false,
}) => {
  const date = createdAt.split("T")[0];

  return (
    <Container reverseBackgroundColor={reverseBackgroundColor}>
      <Comment reverseBackgroundColor={reverseBackgroundColor}>
        <div id="header">
          <span id="title">답변</span> <span id="date">{date}</span>
        </div>
        <button>편집</button>
        <div id="comment">{content}</div>
      </Comment>
    </Container>
  );
};

export default ProductCommentCard;

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  margin: 0 auto;
  min-height: 80px;
  background-color: #f8f8fb;
  padding: 5px 0;

  @media (max-width: 500px) {
    background-color: ${({ reverseBackgroundColor }) =>
      reverseBackgroundColor ? "#ffffff" : "#f8f8fb"};
  }
`;

const Comment = styled.div`
  width: 90%;
  background-color: #ffffff;
  margin: 0 auto;
  font-size: 15px;

  @media (max-width: 500px) {
    background-color: ${({ reverseBackgroundColor }) =>
      reverseBackgroundColor ? "#f8f8fb" : "#ffffff"};
  }

  #header {
    margin: 20px;
  }

  #title {
    color: #ffb564;
    font-weight: bold;
    margin-right: 10px;
  }

  #date {
    color: #606060;
  }

  #comment {
    margin: 20px;
  }
`;
