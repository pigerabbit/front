import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

const UserTopBar = ({ pageName }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handlePreviousBtnClick = () => {
    location.pathname === "/businessauth"
      ? navigate("/mypage")
      : navigate("/login");
  };

  return (
    <TopBar>
      <div>
        {!(location.pathname === "/login") && (
          <FontAwesomeIcon
            icon={faArrowLeft}
            onClick={handlePreviousBtnClick}
          />
        )}
      </div>
      {pageName}
      <div></div>
    </TopBar>
  );
};

export default UserTopBar;

const TopBar = styled.div`
  background-color: white;
  width: 100%;
  height: 10vh;
  min-height: 80px;
  max-height: 90px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 1px 2px -1px #ababab;
  color: #939393;
  font-size: 4.5vw;
  @media (min-width: 500px) {
    font-size: 3.5vw;
  }
  @media (min-width: 770px) {
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
      color: #f79831;
    }
  }
`;
