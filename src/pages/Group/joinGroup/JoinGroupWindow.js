import React, { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as Api from "api";

import GroupCard from "./GroupCard";
import LoadingSpinner from "components/LoadingSpinner";

const JoinGroupWindow = ({ productId, setShowJoinGroup, minPurchaseQty }) => {
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleClose = () => {
    setShowJoinGroup(false);
  };

  const getGroups = async () => {
    try {
      const res = await Api.get("groups/productId", productId, { state: 0 });
      setGroups(
        res.data.payload.filter(
          (group) => new Date(group.deadline) > new Date()
        )
      );
      setLoading(false);
    } catch (e) {
      console.log("공동구매 목록 get 실패");
    }
  };

  useEffect(() => {
    getGroups();
  }, []);

  if (loading)
    return (
      <Container>
        <CardContainer>
          <div id="cancel" onClick={handleClose}>
            <FontAwesomeIcon icon={faXmark} size="2x" />
          </div>
          <div id="spinner">
            <LoadingSpinner />
          </div>
        </CardContainer>
      </Container>
    );

  return (
    <Container onClick={handleClose}>
      <CardContainer
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div id="cancel" onClick={handleClose}>
          <FontAwesomeIcon icon={faXmark} size="2x" />
        </div>
        <h3>공구 참여하기</h3>
        {groups.length > 0 ? (
          groups.map((v) => (
            <GroupCard group={v} minPurchaseQty={minPurchaseQty} />
          ))
        ) : (
          <Message>
            <p>현재 열린 공구가 없습니다.</p>
            <p>상품을 구매하시려면 공구를 열어주세요.</p>
          </Message>
        )}
      </CardContainer>
    </Container>
  );
};

export default JoinGroupWindow;

const popupAnimation = keyframes`
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
  justify-content: center;
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
  animation: ${popupAnimation} 0.7s ease-in-out;

  text-align: center;
  > h3 {
    font-size: 25px;
    margin: 50px 0 30px 0;
    @media (max-width: 500px) {
      font-size: 23px;
      margin: 50px 0 20px 0;
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

  #cancel {
    position: absolute;
    right: 0px;
    padding: 15px;
    cursor: pointer;
    color: #636363;
  }

  #spinner {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
  }
`;

const Message = styled.div`
  font-size: 22px;
  font-weight: bold;
  color: #636363;
  > p {
    margin: 10px auto;
  }
`;
