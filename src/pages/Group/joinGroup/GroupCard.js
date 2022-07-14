import React from "react";
import { useNavigate } from "react-router-dom";
import { useResultOfIntervalCalculator } from "hooks/useInterval";
import { useSelector } from "react-redux";
import styled from "styled-components";

const groupTypes = { normal: "택배", local: "지역", coupon: "이용권" };

const Button = ({ joined = false, onClick }) => {
  if (joined === true)
    return (
      <StyledButton joined={joined} onClick={onClick}>
        참여완료
      </StyledButton>
    );
  return (
    <StyledButton joined={joined} onClick={onClick}>
      참여하기
    </StyledButton>
  );
};

const GroupCard = ({ group, minPurchaseQty }) => {
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const deadline = group.deadline.replace(" ", "T") + ".000Z";
  const remainingTime = new Date(
    useResultOfIntervalCalculator(() =>
      Math.floor((new Date(deadline) - new Date()) / 1000, 10)
    ) * 1000
  );

  let [date, hours, minutes, seconds] = [
    remainingTime.getDate() - 1,
    remainingTime.getHours() - 18,
    `${
      remainingTime.getMinutes() < 10 ? "0" : ""
    }${remainingTime.getMinutes()}`,
    `${
      remainingTime.getSeconds() < 10 ? "0" : ""
    }${remainingTime.getSeconds()}`,
  ];
  if (hours < 0 && date > 0) {
    date -= 1;
    hours += 24;
  }

  const remainingTimeText =
    date > 0
      ? `${date}일 ${hours < 10 ? "0" : ""}${hours}:${minutes}:${seconds}`
      : `${hours < 10 ? "0" : ""}${hours}:${minutes}:${seconds}`;

  const currentPeople = minPurchaseQty - group.remainedPersonnel;

  const isImminent =
    hours + date * 24 < 24 ||
    group.remainedPersonnel / minPurchaseQty < 0.1 ||
    group.remainedPersonnel <= 3;

  const handleClick = () =>
    navigate(`/groups/${group.groupId}`, {
      state: { isImminent },
    });

  return (
    <Container>
      <GroupType type={group.groupType}>
        {groupTypes[group.groupType]}
      </GroupType>
      <GroupInfo>
        <h3>{group.groupName}</h3>
        {group.location && group.groupType === "local" && (
          <p>{group.location}</p>
        )}
      </GroupInfo>
      <Button
        joined={
          group.participants.filter((v) => v.userId === user.id).length > 0
        }
        onClick={handleClick}
      />
      <Current isImminent={isImminent}>
        {currentPeople} / {minPurchaseQty}
        {remainingTime.getFullYear() === 1970 && (
          <Remain>{remainingTimeText}</Remain>
        )}
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

  padding: 15px 0 15px 10px;
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
      case "coupon":
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

  @media (max-width: 510px) {
    width: 30px;
    height: 30px;
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
    word-break: keep-all;
    @media (max-width: 510px) {
      font-size: 16px;
    }
  }
  > p {
    font-size: 15px;
    color: #636363;
    text-align: left;
    margin-top: 5px;
    max-width: 410px;
    word-break: keep-all;
    @media (max-width: 510px) {
      font-size: 13px;
    }
  }

  padding-right: 212px;
  padding-left: 65px;
  @media (max-width: 510px) {
    padding-right: 170px;
    padding-left: 37px;
  }
`;

const Current = styled.div`
  position: absolute;
  right: 115px;
  font-size: 23px;
  font-weight: bold;
  color: ${({ isImminent }) => (isImminent ? "#ff0000" : "#000000")};
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (max-width: 510px) {
    font-size: 20px;
    right: 96px;
  }
`;

const StyledButton = styled.button`
  position: absolute;
  right: 10px;
  width: 90px;
  height: 50px;
  background-color: ${({ joined }) => (joined ? "#d0d0d0" : "#f79831")};
  border-radius: 10px;
  border: none;
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.25);
  font-weight: bold;
  font-size: 15px;
  color: #ffffff;
  cursor: ${({ joined }) => (joined ? "normal" : "pointer")};

  @media (max-width: 510px) {
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
  font-size: 16px;

  @media (max-width: 510px) {
    font-size: 12px;
  }
`;
