import React from "react";
import styled from "styled-components";

const ConfirmationPopup = ({
  children,
  handleClickButton,
  isOpenPopup,
  setIsOpenPopup,
}) => {
  return (
    <Container isOpenPopup={isOpenPopup}>
      {children}
      <ButtonsContainer>
        <Button isCancel={false} onClick={handleClickButton}>
          판매중지
        </Button>
        <Button
          isCancel={true}
          onClick={() => {
            setIsOpenPopup(false);
          }}
        >
          닫기
        </Button>
      </ButtonsContainer>
    </Container>
  );
};

export default ConfirmationPopup;

const Container = styled.div`
z-index: 4;
  position: fixed;
  bottom: ${({ isOpenPopup }) => {
    if (isOpenPopup) return "0;";
    else return "-320px;";
  }}
  transition: bottom 0.3s;

  width: 100%;
  max-width: 770px;
  height: 60vw;
  max-height: 320px;
  background-color: white;
  box-shadow: 0px -10px 10px rgba(0, 0, 0, 0.1);
  border-radius: 30px 30px 10px 10px;
`;

const ButtonsContainer = styled.div`
  position: absolute;
  bottom: 125px;
  @media (max-width: 440px) {
    bottom: 110px;
  }
  width: 100%;
  display: flex;
  justify-content: center;
`;

const Button = styled.div`
  cursor: pointer;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40%;
  height: 8vw;
  font-size: 3vw;
  @media (min-width: 620px) {
    width: 250px;
    height: 50px;
    font-size: 19px;
  }

  color: white;
  background-color: ${({ isCancel }) => {
    if (isCancel) return "#D0D0D0;";
    else return "#FFB564;";
  }};

  & + div {
    margin-left: 5%;
  }
`;
