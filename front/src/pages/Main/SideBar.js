import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

const SideBar = ({ children, title, isOpenSideBar, setIsOpenSideBar }) => {
  return (
    <Container isOpenSideBar={isOpenSideBar}>
      <TitleBar>
        <div></div>
        <span>{title}</span>
        <div
          onClick={() => {
            setIsOpenSideBar(false);
          }}
        >
          <FontAwesomeIcon icon={faXmark} size="1x" />
        </div>
      </TitleBar>
      {children}
    </Container>
  );
};

export default SideBar;

const Container = styled.div`
position: absolute;
top: 0;
left: ${({ isOpenSideBar }) => {
  if (isOpenSideBar) return "0;";
  else return "-100%;";
}}
width: 100%;
height: 100vh;
background-color: #f6f6f6;
transition: left 0.5s;
z-index: 12;
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
  font-size: 25px;
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
