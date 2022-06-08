import React, { useEffect, useState } from "react";
import { useInterval } from "./hooks";
import styled from "styled-components";

const useResultOfIntervalCalculator = (calculator, delay) => {
  const [result, setResult] = useState(calculator());
  useInterval(() => {
    const newResult = calculator();
    if (newResult !== result) setResult(newResult);
  }, delay);

  return result;
};

const groupTypes = { normal: "택배", local: "지역", ticket: "이용권" };

const GroupCard = ({ group, minPurchaseQty }) => {
  const deadline = group.deadline.replace(" ", "T") + ".000Z";
  const remain = new Date(
    useResultOfIntervalCalculator(() =>
      Math.floor((new Date(deadline) - new Date()) / 1000, 10)
    ) * 1000
  );
  const [date, hours, minutes, seconds] = [
    remain.getDate() - 1,
    `${remain.getHours() - 18 < 10 ? "0" : ""}${remain.getHours() - 18}`,
    `${remain.getMinutes() < 10 ? "0" : ""}${remain.getMinutes()}`,
    `${remain.getSeconds() < 10 ? "0" : ""}${remain.getSeconds()}`,
  ];
  const remainText =
    date > 0
      ? `${date}일 ${hours}:${minutes}:${seconds}`
      : `${hours}:${minutes}:${seconds}`;

  const currentPeople = minPurchaseQty - group.remainedPersonnel;

  return (
    <Container>
      <GroupType type={group.groupType}>
        {groupTypes[group.groupType]}
      </GroupType>
      <GroupInfo>
        <h3>{group.groupName ? group.groupName : "임시 이름입니다"}</h3>
        {group.location && <p>({group.location})</p>}
      </GroupInfo>
      <JoinButton>참여하기</JoinButton>
      <Current>
        {currentPeople} / {minPurchaseQty}
        <Remain>{remainText}</Remain>
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
        return "#0000ff";
      case "local":
        return "#ff0000";
      case "ticket":
        return "#00ff00";
      default:
        return "#d0d0d0";
    }
  }};
  font-weight: bold;
  margin-right: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  color: #ffffff;

  @media (max-width: 500px) {
    width: 22px;
    height: 22px;
    font-size: 10px;
    margin-right: 7px;
  }
`;

const GroupInfo = styled.div`
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

  @media (max-width: 500px) {
    width: 163px;
  }
`;

const Current = styled.div`
  position: absolute;
  right: 140px;
  font-size: 25px;
  font-weight: bold;
  color: #ff0000;
  margin: 10px 0;

  @media (max-width: 500px) {
    font-size: 18px;
    right: 100px;
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
  color: #ff0000;
  text-align: left;
  font-size: 18px;

  @media (max-width: 500px) {
    font-size: 13px;
  }
`;
