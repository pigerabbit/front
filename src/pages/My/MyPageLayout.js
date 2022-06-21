import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

import TabBar from "components/TabBar";

const MyPageLayout = ({ children, pageName, previousPage }) => {
  const navigate = useNavigate();

  const handlePreviousBtnClick = () => {
    navigate(previousPage);
  };

  return (
    <Container>
      <TopBar>
        <div>
          {previousPage !== "none" && (
            <FontAwesomeIcon
              icon={faArrowLeft}
              onClick={handlePreviousBtnClick}
            />
          )}
        </div>
        {pageName}
        <div></div>
      </TopBar>

      {children}

      <TabBar />
    </Container>
  );
};

export default MyPageLayout;

const Container = styled.div`
  position: relative;
  width: 100%;
  max-width: 770px;
  min-width: 360px;
  min-height: 100vh;
  background-color: #f6f6f6;
  overflow: hidden;
`;

const TopBar = styled.div`
  background-color: white;
  width: 100%;
  height: 18vw;
  max-height: 90px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 3px 3px -3px #c7c7c7;
  color: #939393;
  font-size: 4.5vw;
  @media (min-width: 700px) {
    font-size: 28px;
  }

  > div {
    width: 15%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    > svg {
      cursor: pointer;
    }
  }
`;
