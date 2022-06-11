import React, { useState, useEffect } from "react";
import styled from "styled-components";
import * as Api from "api";

const CommentForm = () => {
  const [comment, setComment] = useState("");

  const handleSubmit = async () => {};

  return (
    <Container>
      <form onSubmit={handleSubmit}>
        <CommentContainer>
          <input
            type="text"
            id="comment"
            placeholder="댓글을 입력해주세요."
            name="comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            required
          />
          <button id="submit">등록</button>
        </CommentContainer>
      </form>
    </Container>
  );
};

export default CommentForm;

const Container = styled.div`
  min-width: 360px;
  max-width: 770px;
  background-color: #ffffff;
`;

const CommentContainer = styled.div`
  margin-top: 10px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  #comment {
    width: 90%;
    background-color: #f8f8fb;
    border: 1px solid #d0d0d0;
    padding: 10px;
    margin-right: 50px;

    box-shadow: 1.5px 1.5px 1.5px rgba(0, 0, 0, 0.1);
  }

  #submit {
    position: absolute;
    right: 20px;
    width: 40px;
    height: 38px;
    cursor: pointer;
    color: #ffffff;
    font-weight: bold;
    background-color: #ffb564;
    border: none;

    box-shadow: 1.5px 1.5px 1.5px rgba(0, 0, 0, 0.1);
  }
`;
