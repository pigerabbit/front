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
              navigate("/");
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
              navigate("/purchasedetail");
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
      <Cricle index={"bottom"} width={120} color={"white"} bottom={0} />
      <Cricle index={"top"} width={120} color={"white"} bottom={0} />
      <Cricle
        index={"top"}
        width={90}
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
  height: 80px;
  background-color: white;
  display: flex;
  justify-content: space-between;
  z-index: 9;
  filter: drop-shadow(0px -5px 8px rgba(0, 0, 0, 0.2));
`;

const Cricle = styled.div`
  position: absolute;
  left: calc(50% - ${({ width }) => width / 2}px);
  bottom: ${({ bottom }) => bottom}px;
  width: ${({ width }) => width}px;
  height: ${({ width }) => width}px;
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
    margin-top: 10px;
  }

  ${({ index }) => {
    if (index === "bottom")
      return "filter: drop-shadow(0px -5px 8px rgba(0, 0, 0, 0.2)); z-index: 8;";
    else if (index === "top") return "z-index: 10;";
  }};
`;

const LeftRight = styled.div`
  box-sizing: border-box;
  width: 40%;
  padding: 0 7%;
  display: felx;
  justify-content: space-between;
`;

const Tab = styled.div`
  width: 60px;
  height: 100%;
  cursor: pointer;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #8a8a8a;
  font-weight: 600;
  font-size: 12px;

  span {
    margin-top: 10px;
  }
`;
