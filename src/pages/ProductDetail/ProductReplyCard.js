import React, { useState } from "react";
import styled from "styled-components";

const ProductReplyCard = ({
  createdAt,
  content,
  isSeller,
  reverseBackgroundColor = false,
}) => {
  const [isEditing, setIsEditing] = useState(false);

  const date = createdAt.split("T")[0];

  const handleEditButton = (e) => {
    e.stopPropagation();
    setIsEditing(true);
  };

  return (
    <Container reverseBackgroundColor={reverseBackgroundColor}>
      <Comment reverseBackgroundColor={reverseBackgroundColor}>
        <div id="header">
          <span id="title">답변</span> <span id="date">{date}</span>
        </div>
        {isSeller && <EditButton onClick={handleEditButton}>편집</EditButton>}
        <div id="comment">{content}</div>
      </Comment>
    </Container>
  );
};

export default ProductReplyCard;

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

const EditButton = styled.button`
  position: absolute;
  right: 50px;
  top: 15px;
  border: 1px solid #dedede;
  background-color: #ffffff;

  color: #555;
  padding: 5px;
  font-size: 13px;

  &:hover {
    cursor: pointer;
    background-color: #f0f0f0;
  }

  @media (max-width: 500px) {
    right: 40px;
  }
`;
