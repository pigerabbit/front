import React, { useState } from "react";
import styled, { keyframes } from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

import usePreventScroll from "hooks/usePreventScroll";

const SideBar = ({ children, title, setIsOpenSideBar }) => {
  const [show, setShow] = useState(true);

  const handleCancelClick = () => {
    setShow(false);
    setTimeout(() => {
      setIsOpenSideBar(false);
    }, 500);
  };

  usePreventScroll();

  return (
    <Container show={show}>
      <TitleBar>
        <div></div>
        <span>{title}</span>
        <div onClick={handleCancelClick}>
          <FontAwesomeIcon icon={faXmark} size="1x" />
        </div>
      </TitleBar>
      {children}
    </Container>
  );
};

export default SideBar;

const sidebarShow = keyframes`
  0% {
    left: -100%;
  }
  100% {
    left: 0;
  }
`;

const sidebarUnshow = keyframes`
0% {
  left: 0;
}
100% {
  left: -100%;
}
`;

const Container = styled.div`
  position: absolute;
  top: 0;
  width: 100%;
  height: 100vh;
  background-color: #f6f6f6;
  z-index: 12;
  animation: ${sidebarShow} 0.5s;
  animation: ${({ show }) => (show ? sidebarShow : sidebarUnshow)} 0.5s;
`;

const TitleBar = styled.div`
  box-sizing: border-box;
  width: 100%;
  height: 10vh;
  min-height: 70px;
  background-color: white;
  border-bottom: solid 1px #dadada;

  padding: 0 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 20px;
  @media (min-width: 500px) {
    font-size: 22px;
  }
  @media (min-width: 770px) {
    font-size: 26px;
  }
  color: #636363;

  div {
    width: 50px;
    font-size: 30px;
    display: flex;
    justify-content: center;
  }

  div:last-child {
    cursor: pointer;
  }
`;
