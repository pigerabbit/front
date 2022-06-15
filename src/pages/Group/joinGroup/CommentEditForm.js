import React, { useState } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import * as Api from "api";

const CommentEditForm = ({ postId, content, setComments, setIsEditing }) => {
  const [comment, setComment] = useState(content);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await Api.put(`posts/${postId}`, {
        content: comment,
      });
      const editedComment = res.data.payload;
      setComments((cur) =>
        cur.map((v) => (v.postId === postId ? editedComment : v))
      );
      setIsEditing(false);
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
            onChange={(e) => setComment(e.target.value)}
            required
          />
          <button id="submit">확인</button>
        </CommentContainer>
      </form>
    </Container>
  );
};

export default CommentEditForm;

const Container = styled.div`
  min-width: 360px;
  max-width: 770px;
  background-color: #ffffff;
`;

const CommentContainer = styled.div`
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
    color: #ffb564;
    font-weight: bold;
    border: 1px solid #ffb564;
    background-color: #ffffff;
    box-shadow: 1.5px 1.5px 1.5px rgba(0, 0, 0, 0.1);

    &:hover {
      background-color: #e3e3e3;
    }
  }
`;
