import React from "react";
import styled from "styled-components";

const ProductCommentCard = ({ createdAt, content }) => {
  const date = createdAt.split("T")[0];

  return (
    <Container>
      <Comment>
        <div id="header">
          <span id="title">답변</span> <span id="date">{date}</span>
        </div>
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

  #replyText {
    overflow: auto;
    outline: none;

    -webkit-box-shadow: none;
    -moz-box-shadow: none;
    box-shadow: none;

    resize: none;

    word-spacing: 0;

    width: 80%;
    margin: 8px auto;
    background-color: #ffffff;
    border: 1px solid #d0d0d0;
    padding: 10px;
  }
`;

const Comment = styled.div`
  width: 90%;
  background-color: #ffffff;
  margin: 0 auto;
  font-size: 15px;

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
