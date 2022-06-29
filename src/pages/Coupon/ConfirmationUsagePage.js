import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

const ConfirmationUsagePage = ({ setConfirmation }) => {
  const navigate = useNavigate();

  const handleConfirmation = () => {
    setConfirmation(true);
  };

  const handleCancel = () => {
    navigate("/check/result", { state: { success: false } });
  };

  return (
    <Container>
      <ConfirmationContainer>
        <div id="roundIcon">
          <FontAwesomeIcon icon={faCheck} />
        </div>
        <h1>이용권을 사용하시겠습니까?</h1>
        <ButtonContainer>
          <Button confirm={true} onClick={handleConfirmation}>
            네
          </Button>
          <Button confirm={false} onClick={handleCancel}>
            아니요
          </Button>
        </ButtonContainer>
      </ConfirmationContainer>
      <WarningContainer>
        <h3>주의사항</h3>
        <div>
          <span>
            1. 본 이용권의 사용을 승인하기 위해서는 "네" 버튼을 눌러주시기
            바랍니다.
          </span>
          <span>
            2. 사용자 부주의에 의해 이용권이 사용되었을 경우, 이에 대한 책임은
            사용자에게 있습니다.
          </span>
          <span>3. 위 사유에 대해서는 이용권의 환불이 불가능합니다.</span>
        </div>
      </WarningContainer>
    </Container>
  );
};

export default ConfirmationUsagePage;

const Container = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ConfirmationContainer = styled.div`
  z-index: 10;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #ffffff;

  #roundIcon {
    width: 210px;
    height: 210px;
    background-color: #ffb564;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    margin-bottom: 20px;

    > svg {
      width: 160px;
      height: 160px;
      color: #ffffff;
    }

    @media (max-width: 400px) {
      width: 150px;
      height: 150px;
      > svg {
        width: 100px;
        height: 100px;
      }
    }
  }

  > h1 {
    margin-bottom: 15px;
    @media (max-width: 400px) {
      font-size: 25px;
    }
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 80%;
  padding-bottom: 30px;
`;

const Button = styled.button`
  width: 49%;
  background-color: #ffffff;
  border: ${({ confirm }) =>
    confirm ? "2px solid #82af50" : "2px solid #d3623b"};
  border-radius: 10px;
  color: ${({ confirm }) => (confirm ? "#82af50" : "#d3623b")};
  font-weight: bold;
  padding: 10px;
  font-size: 20px;

  &:hover {
    color: #ffffff;
    background-color: ${({ confirm }) => (confirm ? "#82af50" : "#d3623b")};
  }
`;

const WarningContainer = styled.div`
  position: absolute;
  width: 100%;
  bottom: 0;
  margin: 0;
  background-color: #e0e0e0;
  padding: 20px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  > h3 {
    margin-bottom: 8px;
  }

  > div {
    display: flex;
    flex-direction: column;
    margin: 0px 20px;
    > span {
      margin-bottom: 3px;
    }
  }
`;
