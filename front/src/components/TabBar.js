import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouseChimney } from "@fortawesome/free-solid-svg-icons";
import {
  faComments,
  faHeart,
  faFileLines,
  faUser,
} from "@fortawesome/free-regular-svg-icons";

import { useNavigate } from "react-router-dom";

const TabBar = () => {
  const navigate = useNavigate();

  return (
    <>
      <Container>
        <LeftRight>
          <Tab
            onClick={() => {
              navigate("/board");
            }}
          >
            <FontAwesomeIcon icon={faComments} size="2x" />
            <span>소곤소곤</span>
          </Tab>
          <Tab
            onClick={() => {
              navigate("/wishlist");
            }}
          >
            <FontAwesomeIcon icon={faHeart} size="2x" />
            <span>찜</span>
          </Tab>
        </LeftRight>
        <LeftRight>
          <Tab
            onClick={() => {
              navigate("/purchaselist");
            }}
          >
            <FontAwesomeIcon icon={faFileLines} size="2x" />
            <span>공구내역</span>
          </Tab>
          <Tab
            onClick={() => {
              navigate("/mypage");
            }}
          >
            <FontAwesomeIcon icon={faUser} size="2x" />
            <span>my소공</span>
          </Tab>
        </LeftRight>
      </Container>
      <Cricle index={"bottom"} width={110} color={"white"} bottom={0} />
      <Cricle index={"top"} width={110} color={"white"} bottom={0} />
      <Cricle
        index={"top"}
        width={80}
        color={"#FFB564"}
        bottom={15}
        onClick={() => {
          navigate("/");
        }}
      >
        <FontAwesomeIcon icon={faHouseChimney} size="2x" />
        <span>소공소공</span>
      </Cricle>
    </>
  );
};

export default TabBar;

const Container = styled.div`
  position: fixed;
  bottom: 0;
  width: 100%;
  max-width: 770px;
  height: 75px;
  @media (max-width: 440px) {
    height: 65px;
  }
  background-color: white;
  display: flex;
  justify-content: space-between;
  z-index: 9;
  box-shadow: 0 -8px 8px -6px #c0c0c0;
`;

const Cricle = styled.div`
  position: fixed;
  left: calc(50% - ${({ width }) => width / 2}px);
  bottom: ${({ bottom }) => bottom}px;
  width: ${({ width }) => width}px;
  height: ${({ width }) => width}px;
  @media (max-width: 440px) {
    width: ${({ width }) => width - 20}px;
    height: ${({ width }) => width - 20}px;
    left: calc(50% - ${({ width }) => (width - 20) / 2}px);
    font-size: 12px;
  }
  border-radius: 50%;
  background-color: ${({ color }) => color};
  cursor: pointer;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: white;
  font-weight: 600;

  span {
    margin-top: 6px;
  }

  ${({ index }) => {
    if (index === "bottom")
      return "filter: drop-shadow(0px -5px 8px rgba(0, 0, 0, 0.2)); z-index: 8;";
    else if (index === "top") return "z-index: 10;";
  }};
`;

const LeftRight = styled.div`
  box-sizing: border-box;
  width: 40vw;
  padding: 0 7vw;
  @media (max-width: 440px) {
    padding: 0 6vw;
  }
  @media (min-width: 440px) and (max-width: 580px) {
    padding: 0 5.5vw;
  }
  @media (min-width: 770px) {
    width: 310px;
    padding: 0 55px;
  }
  display: felx;
  justify-content: space-between;
`;

const Tab = styled.div`
  width: 60px;
  @media (max-width: 440px) {
    width: 45px;
  }
  height: 100%;
  cursor: pointer;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #8a8a8a;
  font-weight: 600;
  font-size: 12px;
  @media (max-width: 440px) {
    font-size: 10px;
  }
  span {
    margin-top: 10px;
  }
`;
