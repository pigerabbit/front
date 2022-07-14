import React, { useState } from "react";
import styled from "styled-components";
import * as Api from "api";

import AlertPopup from "components/AlertPopup";

const CommentForm = ({ groupId, setComments, joinedGroup }) => {
  const [comment, setComment] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [alertContent, setAlertContent] = useState("");

  const handleChange = (e) => {
    const content = e.target.value;
    if (content.length >= e.target.maxLength) {
      setAlertContent(
        `최대 ${e.target.maxLength.toLocaleString()}자까지 작성할 수 있습니다.`
      );
      setShowAlert(true);
      return;
    } else {
      setComment(e.target.value);
    }
  };

  const handleKeyPress = (e) => {
    if (showAlert) {
      e.preventDefault();
    }
  };

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
            placeholder="댓글을 입력해주세요.(100자 이하)"
            name="comment"
            value={comment}
            onInput={handleChange}
            onKeyPress={handleKeyPress}
            maxLength={100}
            required
          />
          <button id="submit" disabled={!joinedGroup}>
            등록
          </button>
        </CommentContainer>
      </form>
      {showAlert && (
        <AlertPopup
          alertContent={alertContent}
          showAlert={showAlert}
          setShowAlert={setShowAlert}
        >
          {alertContent}
        </AlertPopup>
      )}
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
