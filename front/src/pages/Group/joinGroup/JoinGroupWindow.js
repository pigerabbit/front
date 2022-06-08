import React, { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import * as Api from "api";

import GroupCard from "./GroupCard";

const JoinGroupWindow = ({ productId, setShowJoinGroup, minPurchaseQty }) => {
  const [groups, setGroups] = useState([]);

  const getGroups = async () => {
    try {
      const res = await Api.get(`groups/productId/${productId}`);
      setGroups(res.data.payload);
    } catch (e) {
      console.log("공동구매 목록 get 실패");
    }
  };

  useEffect(() => {
    getGroups();
  }, []);
  return (
    <Container>
      <CardContainer>
        <div id="cancel">
          <Cancel
            onClick={() => {
              setShowJoinGroup(false);
            }}
          />
        </div>
        <h3>공구 참여하기</h3>
        {groups.map((v) => (
          <GroupCard group={v} minPurchaseQty={minPurchaseQty} />
        ))}
      </CardContainer>
    </Container>
  );
};

export default JoinGroupWindow;

const PopupAnimation = keyframes`
  from{
    transform: translateY(50%);
  }
  to{
    transform: none;
  }
`;

const Container = styled.div`
  position: fixed;
  width: 100%;
  max-width: 770px;
  min-width: 360px;
  min-height: 100vh;
  top: 0;
  margin: 0 auto;
  z-index: 10;
  background-color: rgba(10, 10, 10, 0.5);
`;

const CardContainer = styled.div`
  background: #ffffff;
  border-radius: 10px 10px 0 0;
  width: 100%;
  max-width: 770px;
  min-width: 360px;
  height: 90%;
  position: fixed;
  z-index: 10;
  bottom: 0;
  animation: ${PopupAnimation} 1s ease-in-out;

  text-align: center;
  > h3 {
    font-size: 25px;
    margin-bottom: 30px;
    @media (max-width: 500px) {
      font-size: 20px;
      margin-bottom: 20px;
    }
  }
  > p {
    text-align: left;
    font-size: 18px;
    padding: 10px 50px;
    @media (max-width: 500px) {
      font-size: 15px;
      padding: 8px 25px;
    }
  }
`;

const Cancel = styled.div`
  width: 50px;
  height: 50px;
  opacity: 0.8;
  cursor: pointer;

  :before,
  :after {
    position: absolute;
    right: 30px;
    top: 15px;
    content: " ";
    height: 30px;
    width: 2px;
    background-color: #000;
  }
  :before {
    transform: rotate(45deg);
  }
  :after {
    transform: rotate(-45deg);
  }
`;
