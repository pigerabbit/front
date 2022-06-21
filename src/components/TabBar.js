import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouseChimney } from "@fortawesome/free-solid-svg-icons";
import {
  faBell,
  faHeart,
  faFileLines,
  faUser,
} from "@fortawesome/free-regular-svg-icons";

import Notice from "pages/Main/Notice";
import { useSelector } from "react-redux";

const TabBar = () => {
  const { isNoticeExist } = useSelector((state) => state.user);
  const [isOpenNotice, setIsOpenNotice] = useState(false);

  const navigate = useNavigate();

  const handleNoticeClick = () => {
    setIsOpenNotice(true);
  };

  const handleTabClick = (url) => {
    return () => {
      navigate(url);
    };
  };

  return (
    <>
      {isOpenNotice && <Notice setIsOpenNotice={setIsOpenNotice} />}

      <Cricle shadow={true} width={110} color={"white"} bottom={0} />
      <Container>
        <Tab onClick={handleNoticeClick}>
          {isNoticeExist && <Dot />}
          <FontAwesomeIcon icon={faBell} size="2x" />
          <span>알림</span>
        </Tab>

        <Tab onClick={handleTabClick("/wishlist")}>
          <FontAwesomeIcon icon={faHeart} size="2x" />
          <span>찜</span>
        </Tab>

        <CriclesContainer>
          <Cricle width={110} color={"white"} bottom={0} />
          <Cricle
            width={80}
            color={"#FFB564"}
            bottom={15}
            onClick={handleTabClick("/")}
          >
            <FontAwesomeIcon icon={faHouseChimney} size="2x" />
            <span>동구라미</span>
          </Cricle>
        </CriclesContainer>

        <Tab onClick={handleTabClick("/purchaselist")}>
          <FontAwesomeIcon icon={faFileLines} size="2x" />
          <span>공구내역</span>
        </Tab>

        <Tab onClick={handleTabClick("/mypage")}>
          <FontAwesomeIcon icon={faUser} size="2x" />
          <span>my동구</span>
        </Tab>
      </Container>
    </>
  );
};

export default TabBar;

const Container = styled.div`
  position: fixed;
  bottom: 0;
  width: 100%;
  min-width: 360px;
  max-width: 770px;
  height: 75px;
  @media (max-width: 440px) {
    height: 65px;
  }
  background-color: white;
  display: flex;
  justify-content: space-around;
  z-index: 10;
  box-shadow: 0 -8px 8px -6px #c0c0c0;
`;

const CriclesContainer = styled.div`
  position: relative;
  width: 60px;
  @media (max-width: 440px) {
    width: 45px;
  }
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: -1;
`;

const Cricle = styled.div`
  cursor: pointer;
  position: fixed;
  bottom: ${({ bottom }) => bottom}px;
  width: ${({ width }) => width}px;
  height: ${({ width }) => width}px;
  @media (max-width: 440px) {
    width: ${({ width }) => width - 20}px;
    height: ${({ width }) => width - 20}px;
    font-size: 12px;
  }
  border-radius: 50%;
  background-color: ${({ color }) => color};

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: white;
  font-weight: 600;

  span {
    margin-top: 6px;
  }

  z-index: 10;

  filter: ${({ shadow }) =>
    shadow && "drop-shadow(0px -5px 7px rgba(0, 0, 0, 0.2));"};
  left: ${({ shadow }) => shadow && "calc(50% - 45px);"};
  @media (min-width: 440px) {
    left: ${({ shadow }) => shadow && "calc(50% - 55px);"};
  }
  @media (min-width: 770px) {
    left: ${({ shadow }) => shadow && "calc(50% - 55px);"};
  }
`;

const Tab = styled.div`
  cursor: pointer;
  position: relative;
  width: 60px;
  @media (max-width: 440px) {
    width: 45px;
  }
  height: 100%;

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

const Dot = styled.div`
  position: absolute;
  top: 10%;
  right: 15%;
  width: 6px;
  height: 6px;
  @media (max-width: 440px) {
    width: 5px;
    height: 5px;
  }
  border-radius: 50%;
  background-color: red;
`;
