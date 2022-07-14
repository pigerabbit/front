import React, { useState } from "react";
import styled from "styled-components";
import * as Api from "api";

import AlertPopup from "components/AlertPopup";

const ProductReplyEditForm = ({ comment, setComment, setIsEditingReply }) => {
  const [commentText, setCommentText] = useState(comment.content);
  const [showAlert, setShowAlert] = useState(false);
  const [alertContent, setAlertContent] = useState("");

  const postId = comment.postId;

  const handleChange = (e) => {
    const content = e.target.value;
    if (content.length >= e.target.maxLength) {
      setAlertContent(
        `최대 ${e.target.maxLength.toLocaleString()}자까지 작성할 수 있습니다.`
      );
      setShowAlert(true);
      return;
    } else {
      setCommentText(e.target.value);
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
      const res = await Api.put(`posts/${postId}`, {
        content: commentText,
      });
      setComment(res.data.payload);
      setIsEditingReply(false);
    } catch (e) {
      console.log("comment post 실패");
    }
  };

  return (
    <Container id="replyFormContainer">
      <form>
        <p id="replyFormTitle">답변하기</p>
        <textarea
          id="replyText"
          name="replyText"
          defaultValue={commentText}
          rows="6"
          onInput={handleChange}
          onKeyPress={handleKeyPress}
          maxLength={5000}
          required
        />
      </form>
      <ButtonContainer>
        <Button
          id="replyCancel"
          onClick={() => {
            setIsEditingReply(false);
          }}
        >
          취소
        </Button>
        <Button type="submit" id="replySubmit" onClick={handleSubmit}>
          확인
        </Button>
      </ButtonContainer>
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

export default ProductReplyEditForm;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin: 0 auto;
  min-height: 200px;
  background-color: #f8f8fb;
  padding: 5px 0;

  form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: 15px;
    width: 100%;
  }

  #replyFormTitle {
    font-weight: bold;
    color: #636363;
  }

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

const ButtonContainer = styled.div`
  width: 83%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin: 0 auto;
`;

const Button = styled.button`
  width: 49%;
  height: 30px;
  border-radius: 5px;
  margin-top: 8px;
  cursor: pointer;

  border: ${({ id }) => (id === "replyCancel" ? "2px solid #d0d0d0" : "none")};
  background-color: ${({ id }) =>
    id === "replyCancel" ? "#ffffff" : "#ff9b2f"};
  color: ${({ id }) => (id === "replySubmit" ? "#ffffff" : "#000000")};
`;
