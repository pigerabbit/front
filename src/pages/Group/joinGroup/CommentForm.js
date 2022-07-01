import React, { useState } from "react";
import styled from "styled-components";
import * as Api from "api";

const CommentForm = ({ groupId, setComments, joinedGroup }) => {
  const [comment, setComment] = useState("");

  const handleChange = (e) => setComment(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await Api.post(`posts`, {
        type: "groupChat",
        receiver: groupId,
        content: comment,
      });
      const newComment = res.data.payload;
      setComments((cur) => [...cur, newComment]);
      setComment("");
    } catch (e) {
      console.log("공구 댓글 post 실패");
    }
  };

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
            onChange={handleChange}
            required
          />
          <button id="submit" disabled={!joinedGroup}>
            등록
          </button>
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
