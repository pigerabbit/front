import React from "react";
import styled, { keyframes } from "styled-components";

const ConfirmationPopup = ({
  children,
  handleButtonClick,
  isOpenPopup,
  setIsOpenPopup,
  buttonContent,
}) => {
  const handleCancelClick = () => {
    setIsOpenPopup(false);
  };

  return (
    <Container isOpenPopup={isOpenPopup} onClick={handleCancelClick}>
      <PopupContainer
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <MessageContainer>{children}</MessageContainer>
        <ButtonsContainer>
          <Button isCancel={false} onClick={handleButtonClick}>
            {buttonContent}
          </Button>
          <Button isCancel={true} onClick={handleCancelClick}>
            취소
          </Button>
        </ButtonsContainer>
      </PopupContainer>
    </Container>
  );
};

export default ConfirmationPopup;

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
  background-color: rgba(10, 10, 10, 0.5);
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
  border-radius: 30px;

  animation: ${popupAnimation} 0.5s ease-in-out;
`;

const MessageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 22px;
  font-weight: bold;
  margin: 30px auto;
`;

const ButtonsContainer = styled.div`
  width: 90%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin: 30px auto;
`;

const Button = styled.div`
  width: 46%;
  height: 60px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  cursor: pointer;
  font-weight: bold;
  margin: 0 auto;

  color: white;
  background-color: ${({ isCancel }) => (isCancel ? "#d0d0d0" : "#d3623b")};
`;
