import React, { useEffect, useState } from "react";
import styled from "styled-components";
import * as Api from "api";

import { useNavigate } from "react-router-dom";

const from = {
  product: "상품 삭제",
  cs: "상품 문의",
  review: "상품 후기",
  group: "공구 알림",
  groupChat: "댓글 알림",
  comment: "답변 알림",
};

const NoticeCard = ({ notice }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    if (notice.from === "product") return;

    if (notice.from === "review" || notice.from === "cs") {
      navigate(`/products/${notice.productId}`, {
        state: { data: { tab: notice.from, postId: notice.sendId } },
      });
    } else if (notice.from === "group" || notice.from === "groupChat") {
      navigate(`/groups/${notice.sendId}`);
    }
  };

  return (
    <Container key={notice._id} onClick={handleCardClick}>
      <Image url={notice.image} />
      <Text>
        <span>[{from[notice.from]}]</span>
        <span>{notice.content}</span>
      </Text>
    </Container>
  );
};

export default NoticeCard;

const Container = styled.div`
  cursor: pointer;
  box-shadow: 0 2px 3px #d9d9d9;
  background-color: white;
  box-sizing: border-box;
  padding: 10px;
  width: 100%;
  max-width: 450px;
  height: 110px;
  margin-bottom: 10px;
  border-radius: 5px;
  display: flex;
  align-items: center;
`;

const Image = styled.div`
  width: 75px;
  min-width:75px
  height: 75px;
  min-height:75px;
  margin-right: 15px;
  border-radius: 50%;
  background-image: url(${({ url }) => url});
  background-size: cover;
  background-position: center;
`;

const Text = styled.div`
  display: flex;
  flex-direction: column;
  width: 60vw;
  max-width: 315px;
  height: 80%;

  > span:first-child {
    font-size: 13px;
    margin-bottom: 10px;
  }

  > span:last-child {
    font-size: 14px;
    line-height: 20px;
    color: #ff9b2f;
  }
`;
