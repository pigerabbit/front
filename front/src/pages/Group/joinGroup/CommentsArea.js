import React, { useState, useEffect } from "react";
import styled from "styled-components";
import * as Api from "api";
import axios from "axios";

import CommentForm from "./CommentForm";

const CommentsArea = ({ group, product, seller }) => {
  const [comments, setComments] = useState([]);

  const getComments = async () => {
    try {
      const res = axios.get(
        Api.serverUrl + `posts?receiver=${group.groupId}&type=groupChat`
      );
      if (res.data) {
        setComments(res.data.payload);
      }
    } catch (e) {
      console.log("댓글 get 실패");
    }
  };

  useEffect(() => {
    getComments();
  }, []);

  return (
    <Container>
      <CommentsContainer>
        <h4>댓글 ({comments.length})</h4>
        <CommentForm />
      </CommentsContainer>
    </Container>
  );
};

export default CommentsArea;

const Container = styled.div`
  width: 100%;
  min-width: 360px;
  max-width: 770px;
  background-color: #ffffff;
`;

const CommentsContainer = styled.div`
  padding: 10px 0 10px 0;
  margin: 20px 20px 0px 20px;
`;
