import React from "react";
import styled from "styled-components";

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
    <Container isOpenPopup={isOpenPopup}>
      <MessageContainer>{children}</MessageContainer>
      <ButtonsContainer>
        <Button isCancel={false} onClick={handleButtonClick}>
          {buttonContent}
        </Button>
        <Button isCancel={true} onClick={handleCancelClick}>
          취소
        </Button>
      </ButtonsContainer>
    </Container>
  );
};

export default ConfirmationPopup;

const Container = styled.div`
  z-index: 15;
  position: fixed;
  bottom: ${({ isOpenPopup }) => {
    if (isOpenPopup) return "0;";
    else return "-320px;";
  }}
  transition: bottom 0.3s;

  left: 0px;
  right: 0px;
  max-width: 770px;
  width: 100%;
  margin: 0 auto;
  padding: 10px 0;
  background-color: #ffffff;

  max-height: 250px;
  background-color: white;
  box-shadow: 0px -10px 10px rgba(0, 0, 0, 0.1);
  border-radius: 30px 30px 10px 10px;
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
  background-color: ${({ isCancel }) => {
    if (isCancel) return "#d0d0d0;";
    else return "#d3623b;";
  }};
`;
