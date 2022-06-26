import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import * as Api from "api";

import CommentEditForm from "./CommentEditForm";

const CommentCard = ({ postId, content, writerId, createdAt, setComments }) => {
  const { user } = useSelector((state) => state.user);

  const [writer, setWriter] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  const date = createdAt.split("T")[0];
  const isEditable = user.id === writerId;

  const clickDelete = async () => {
    try {
      await Api.delete(`posts/${postId}`);
      setComments((cur) => cur.filter((v) => v.postId !== postId));
    } catch (e) {
      console.log("댓글 삭제 실패");
    }
  };

  const clickEdit = () => setIsEditing(true);

  const getWriter = async () => {
    try {
      const res = await Api.get(`users/${writerId}`);
      setWriter(res.data.payload);
    } catch (e) {
      console.log("공구 댓글 작성자 get 실패");
    }
  };

  useEffect(() => {
    getWriter();
  }, []);

  return (
    <Container>
      <CommentContainer>
        {!isEditing ? (
          <>
            <Top>
              <p id="writer">{writer.name}</p>
              <p id="date">{date}</p>
            </Top>

            <p id="content">{content}</p>

            {isEditable && (
              <ButtonContainer>
                <Button onClick={clickEdit}>편집</Button>
                <Button func="delete" onClick={clickDelete}>
                  삭제
                </Button>
              </ButtonContainer>
            )}
          </>
        ) : (
          <CommentEditForm
            postId={postId}
            content={content}
            setComments={setComments}
            setIsEditing={setIsEditing}
          />
        )}
      </CommentContainer>
    </Container>
  );
};

export default CommentCard;

const Container = styled.div`
  min-width: 360px;
  max-width: 770px;
  background-color: #ffffff;
`;

const CommentContainer = styled.div`
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  padding: 12px 5px;
  border-bottom: 1px solid #d0d0d0;

  #content {
    font-size: 15px;
  }
`;

const Top = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  margin-bottom: 7px;
  #writer {
    font-size: 16px;
    margin-right: 10px;
  }
  #date {
    color: #acacac;
    font-size: 13px;
  }
`;

const ButtonContainer = styled.div`
  position: absolute;
  right: 20px;
`;

const Button = styled.button`
  width: 40px;
  border: ${({ func }) =>
    func === "delete" ? "1px solid #db1515" : "1px solid #ffb564"};
  background-color: #ffffff;
  margin-right: 5px;
  color: ${({ func }) => (func === "delete" ? "#db1515" : "#ffb564")};
  font-weight: bold;
  cursor: pointer;

  &:hover {
    background-color: #e3e3e3;
  }
`;
