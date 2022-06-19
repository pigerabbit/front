import React from "react";
import { useNavigate } from "react-router-dom";
import { useResultOfIntervalCalculator } from "hooks/useInterval";
import styled from "styled-components";

const groupTypes = { normal: "택배", local: "지역", ticket: "이용권" };

const GroupCard = ({ group, minPurchaseQty }) => {
  const navigate = useNavigate();
  const deadline = group.deadline.replace(" ", "T") + ".000Z";
  const remain = new Date(
    useResultOfIntervalCalculator(() =>
      Math.floor((new Date(deadline) - new Date()) / 1000, 10)
    ) * 1000
  );
  let [date, hours, minutes, seconds] = [
    remain.getDate() - 1,
    remain.getHours() - 18,
    `${remain.getMinutes() < 10 ? "0" : ""}${remain.getMinutes()}`,
    `${remain.getSeconds() < 10 ? "0" : ""}${remain.getSeconds()}`,
  ];

  if (hours < 0 && date > 0) {
    date -= 1;
    hours += 24;
  }

  const remainText =
    date > 0
      ? `${date}일 ${hours < 10 ? "0" : ""}${hours}:${minutes}:${seconds}`
      : `${hours < 10 ? "0" : ""}${hours}:${minutes}:${seconds}`;
  const currentPeople = minPurchaseQty - group.remainedPersonnel;

  const aboutToClose =
    hours + date * 24 < 12 || group.remainedPersonnel / minPurchaseQty < 0.1;

  return (
    <Container>
      <GroupType type={group.groupType}>
        {groupTypes[group.groupType]}
      </GroupType>
      <GroupInfo>
        <h3>{group.groupName}</h3>
        {group.location && <p>({group.location})</p>}
      </GroupInfo>
      <JoinButton
        onClick={() => {
          navigate(`/groups/${group.groupId}?imminent=${aboutToClose}`);
        }}
      >
        참여하기
      </JoinButton>
      <Current aboutToClose={aboutToClose}>
        {currentPeople} / {minPurchaseQty}
        {remain.getFullYear() === 1970 && <Remain>{remainText}</Remain>}
      </Current>
    </Container>
  );
};

export default GroupCard;

const Container = styled.div`
  position: relative;
  min-height: 80px;
  width: 95%;
  background-color: #ffffff;
  border-bottom: 1px solid #d0d0d0;
  display: flex;
  align-items: center;
  margin: 0 auto;

  padding: 15px 0 15px 15px;
`;

const GroupType = styled.div`
  width: 50px;
  height: 50px;
  background-color: ${({ type }) => {
    switch (type) {
      case "normal":
        return "#D3613B";
      case "local":
        return "#F5CB47";
      case "ticket":
        return "#82AF50";
      default:
        return "#d0d0d0";
    }
  }};
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  color: #ffffff;

  @media (max-width: 500px) {
    width: 22px;
    height: 22px;
    font-size: 10px;
  }
`;

const GroupInfo = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  > h3 {
    font-size: 18px;
    text-align: left;
    margin-top: 10px;
    margin-bottom: 5px;
    @media (max-width: 500px) {
      font-size: 16px;
    }
  }
  > p {
    font-size: 15px;
    color: #636363;
    text-align: left;
    margin-bottom: 10px;
    @media (max-width: 500px) {
      font-size: 13px;
    }
  }

  padding-right: 212px;
  padding-left: 65px;
  @media (max-width: 500px) {
    padding-right: 170px;
    padding-left: 33px;
  }
`;

const Current = styled.div`
  position: absolute;
  right: 140px;
  font-size: 25px;
  font-weight: bold;
  color: ${({ aboutToClose }) => (aboutToClose ? "#ff0000" : "#000000")};
  margin: 10px 0;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (max-width: 500px) {
    font-size: 20px;
    right: 105px;
  }
`;

const JoinButton = styled.button`
  position: absolute;
  right: 15px;
  width: 100px;
  height: 50px;
  background-color: #f79831;
  border-radius: 10px;
  border: none;
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.25);
  font-weight: bold;
  font-size: 15px;
  color: #ffffff;
  cursor: pointer;

  @media (max-width: 500px) {
    width: 78px;
    height: 45px;
  }

  &:hover {
    background-color: #d0d0d0;
  }
`;

const Remain = styled.div`
  margin-top: 5px;
  font-weight: bold;
  text-align: left;
  font-size: 18px;

  @media (max-width: 500px) {
    font-size: 13px;
  }
`;
