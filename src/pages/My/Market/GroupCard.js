import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import ParticipantsList from "./ParticipantsList";
import getDeadline from "utils/getDeadline";
import { groupTypes, groupState, returnBgColor } from "../MyPageModule";

const ProductCard = ({ group }) => {
  const [isParticipantsListOpen, setIsParticipantsListOpen] = useState(false);

  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/groups/${group.groupId}`);
  };

  const handleParticipantsListClick = (e) => {
    e.stopPropagation();

    setIsParticipantsListOpen(true);
  };
  return (
    <>
      <Container onClick={handleCardClick}>
        <Content>
          <Title>
            <span>[{groupTypes[group.groupType]}]</span>
            <span>{group.groupName}</span>
          </Title>

          <State bgColor={returnBgColor(group.state)}>
            {groupState[group.state][0]}
          </State>

          <Deadline>{getDeadline(group.deadline)}</Deadline>

          {group.state > 0 && (
            <PurchasersButton onClick={handleParticipantsListClick}>
              참여자 목록
            </PurchasersButton>
          )}
        </Content>
      </Container>

      {isParticipantsListOpen && (
        <ParticipantsList
          groupName={group.groupName}
          groupType={group.groupType}
          participants={group.participants}
          setIsParticipantsListOpen={setIsParticipantsListOpen}
        />
      )}
    </>
  );
};

export default ProductCard;

const Container = styled.div`
  cursor: pointer;
  background-color: white;
  position: relative;
  margin-top: 7px;
  box-shadow: 0 3px 3px -3px #c7c7c7;
  width: 100%;
  display: flex;
  justify-content: center;

  &:active {
    background-color: #fafafa;
    > div:first-child {
      background-color: #fafafa;
    }
  }

  > svg {
    z-index: 3;
    cursor: pointer;
    width: 5%;
    color: #aaaaaa;
    position: absolute;
    right: 10%;
    top: 15%;
    font-size: 3vw;
    transition: color 0.4s;

    &:hover {
      color: #ffb564;
    }
  }
`;

const Content = styled.div`
  z-index: 2;
  background-color: white;
  position: relative;
  width: 90%;
  max-width: 550px;
  margin: 3vw 0;
  @media (min-width: 620px) {
    margin: 18px 0;
  }
  display: flex;
  flex-direction: column;
`;

const Title = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 3.3vw;
  @media (min-width: 620px) {
    font-size: 21px;
  }

  > span {
    margin-bottom: 5px;
  }

  > span:first-child {
    font-size: 2.5vw;
    @media (min-width: 620px) {
      font-size: 16px;
    }
  }
`;

const State = styled.div`
  box-sizing: border-box;
  width: 14%;
  background-color: ${({ bgColor }) => bgColor};
  color: white;
  border-radius: 5px;
  font-size: 2.2vw;
  @media (min-width: 620px) {
    font-size: 13.5px;
  }
  text-align: center;
  padding: 1.3%;
  padding-top: 1.6%;
  margin-top: 2%;
`;

const Deadline = styled.span`
  margin-top: 2%;
  color: #969696;
  font-size: 2.5vw;
  @media (min-width: 620px) {
    font-size: 16px;
  }
`;

const PurchasersButton = styled.button`
  position: absolute;
  bottom: 0;
  right: 0;
  width: 16%;
  max-width: 100px;
  z-index: 3;
  cursor: pointer;
  border: none;
  color: white;
  padding: 1.2%;
  background: #ffb564;
  box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.15);
  font-size: 2vw;
  @media (min-width: 620px) {
    font-size: 13px;
  }
`;
