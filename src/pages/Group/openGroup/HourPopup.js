import styled from "styled-components";
import usePreventScroll from "hooks/usePreventScroll";
import { options } from "../GroupModule";

const HourPopup = ({ setIsHourPopup, setHour }) => {
  usePreventScroll();

  const handleHourClick = (option) => () => {
    setHour(`${option}시간`);
    setIsHourPopup(false);
  };

  return (
    <Container onClick={() => setIsHourPopup(false)}>
      <HourContainer>
        {options.map((option) => (
          <Hour onClick={handleHourClick(option)} key={option}>
            {option}시간
          </Hour>
        ))}
      </HourContainer>
    </Container>
  );
};

export default HourPopup;

const Container = styled.div`
  z-index: 11;
  position: fixed;
  background: rgba(0, 0, 0, 0.2);
  width: 100%;
  max-width: 770px;
  height: 100%;
  top: 0;

  display: flex;
  justify-content: center;
  align-items: center;
`;

const HourContainer = styled.div`
  background-color: white;
  width: 40%;
  min-width: 260px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Hour = styled.div`
  cursor: pointer;
  border-bottom: 1px solid #c0c0c0;
  box-sizing: border-box;
  width: 100%;
  padding: 5% 0;

  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.3s;

  &:hover {
    background-color: #e0e0e0;
  }

  &:last-child {
    border-bottom: none;
  }
`;
