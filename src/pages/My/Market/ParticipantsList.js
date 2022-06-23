import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

import { groupTypes } from "../MyPageModule";

const ParticipantsList = ({
  groupName,
  groupType,
  participants,
  setIsParticipantsListOpen,
}) => {
  const handleListClose = () => {
    setIsParticipantsListOpen(false);
  };

  return (
    <Background>
      <Container>
        <FontAwesomeIcon icon={faXmark} onClick={handleListClose} />
        <GroupName>
          [{groupTypes[groupType]}] {groupName}
        </GroupName>

        {participants.map((participant) => (
          <ParticipantCard key={participant._id}>
            <div>이름(닉네임): {participant.userInfo.name}</div>
            <div>구매수량: {participant.quantity}</div>
            <div>주소: {participant.userInfo.address}</div>
            <div>전화번호: {participant.userInfo.phoneNumber}</div>
            <div>이메일: {participant.userInfo.email}</div>
          </ParticipantCard>
        ))}
      </Container>
    </Background>
  );
};

export default ParticipantsList;

const Background = styled.div`
  z-index: 12;
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.2);
`;

const Container = styled.div`
  position: relative;
  width: 80%;
  max-width: 620px;
  height: 80%;
  overflow: scroll;
  background-color: white;
  display: flex;
  flex-direction: column;
  align-items: center;

  &::-webkit-scrollbar {
    background-color: white;
    width: 6px;
  }
  &::-webkit-scrollbar-thumb {
    background: #d9d9d9;
    border-radius: 10px;
    opacity: 0.4;
  }

  > svg {
    cursor: pointer;
    position: absolute;
    top: 1%;
    right: 2%;
    color: #a7a7a7;
    font-size: 3.5vw;
    @media (min-width: 770px) {
      font-size: 26px;
    }
  }
`;

const GroupName = styled.div`
  box-sizing: border-box;
  width: 100%;
  text-align: center;
  padding: 5%;
  font-size: 2.8vw;
  @media (min-width: 770px) {
    font-size: 21px;
  }
`;

const ParticipantCard = styled.div`
  border-top: 1px solid #d9d9d9;
  box-sizing: border-box;
  width: 80%;
  padding: 2%;

  > div {
    font-size: 2.4vw;
    @media (min-width: 770px) {
      font-size: 18px;
    }
    margin: 2% 0;
  }
`;
