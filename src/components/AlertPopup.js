import React, { useEffect } from "react";
import styled, { keyframes } from "styled-components";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const AlertPopup = ({ children, showAlert, setShowAlert }) => {
  const handleClose = () => {
    setShowAlert(false);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowAlert(false);
    }, 2500);

    return () => {
      clearTimeout(timer);
    };
  });

  return (
    <Container showAlert={showAlert} onClick={handleClose}>
      <PopupContainer
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div id="cancel" onClick={handleClose}>
          <FontAwesomeIcon icon={faXmark} size="xl" />
        </div>
        <MessageContainer>{children}</MessageContainer>
      </PopupContainer>
    </Container>
  );
};

export default AlertPopup;

const popupAnimation = keyframes`
  from{
    transform: translateY(20%);
  }
  to{
    transform: none;
  }
`;

const Container = styled.div`
  position: fixed;
  left: 0px;
  right: 0px;
  width: 100%;
  max-width: 770px;
  min-width: 360px;
  min-height: 100vh;
  top: 0;
  margin: 0 auto;
  z-index: 10;
  background-color: rgba(10, 10, 10, 0.2);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const PopupContainer = styled.div`
  z-index: 15;
  width: 85%;
  max-height: 250px;
  margin: 0 auto;
  padding: 10px 0;
  background-color: #ffffff;
  border-radius: 10px;

  animation: ${popupAnimation} 0.5s ease-in-out;

  #cancel {
    position: absolute;
    top: inherit;
    right: 8%;
    transform: translateY(-15px);
    padding: 15px;
    cursor: pointer;
    color: #636363;
  }
`;

const MessageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  font-weight: bold;
  margin: 30px auto;
`;
