import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled, { keyframes } from "styled-components";

const SelectGroupPopUpCard = ({ setIsOpen, setIsChecked }) => {
  const handleClick = () => {
    setIsChecked(true);
    setIsOpen(false);
  };
  return (
    <Container>
      <CardContainer>
        <FontAwesomeIcon
          icon={faAngleDown}
          onClick={() => setIsOpen(false)}
          style={{ fontSize: "40px" }}
        />
        <h3>공구 주의사항</h3>
        <p>1. 공구 기준의 50% 이상을 달성한 경우, 공구를 취소할 수 없습니다.</p>
        <p>2. 공구 마감 날짜와 인원을 지정할 수 있습니다.</p>
        <p>
          3. 지역 공구, 픽업 공구의 경우 발생하는 사기 행위에 대해서는 신고를
          받을 수 있습니다.
        </p>
        <p>
          4. 공구 기준에 도달하지 못할 경우, 공구가 진행되지 않습니다. 원하실
          경우 추가 공구를 여실 수 있습니다.
        </p>
        <ConfirmButton onClick={() => handleClick()}>
          동의 후 계속하기
        </ConfirmButton>
      </CardContainer>
    </Container>
  );
};

export default SelectGroupPopUpCard;

const PopupAnimation = keyframes`
  from{
    transform: translateY(50%);
  }
  to{
    transform: none;
  }
`;

const Container = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 10;
  background-color: rgba(100, 100, 100, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CardContainer = styled.div`
  background: #ffc07d;
  border-radius: 10px 10px 0 0;
  width: 100%;
  max-width: 770px;
  min-width: 360px;
  height: 50%;
  position: fixed;
  z-index: 10;
  bottom: 0;
  animation: ${PopupAnimation} 1s ease-in-out;
  text-align: center;
  > h3 {
    font-size: 25px;
    margin-bottom: 30px;
    @media (max-width: 500px) {
      font-size: 20px;
      margin-bottom: 20px;
    }
  }
  > p {
    text-align: left;
    font-size: 18px;
    padding: 10px 50px;
    @media (max-width: 500px) {
      font-size: 15px;
      padding: 8px 25px;
    }
  }
`;

const ConfirmButton = styled.button`
  border: none;
  width: 250px;
  height: 40px;
  border-radius: 10px;
  font-size: 18px;
  font-weight: bold;
  margin-top: 20px;
  background: #fff;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`;
