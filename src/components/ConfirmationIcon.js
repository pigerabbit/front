import React from "react";
import styled, { keyframes } from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSelector } from "react-redux";

const ConfirmationIcon = () => {
  const { show, backgroundColor, color, icon, text } = useSelector(
    (state) => state.confirmationIcon
  );

  if (show)
    return (
      <Container show={show}>
        <Circle backgroundColor={backgroundColor} color={color}>
          <FontAwesomeIcon icon={icon} />
          <span>{text}</span>
        </Circle>
      </Container>
    );
  else return null;
};

export default ConfirmationIcon;

const iconShow = keyframes`
  0% {
    opacity: 0;
  }
  20% {
    opacity: 1;
  }
  80% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
`;

const Container = styled.div`
  z-index: 10;
  position: fixed;
  width: 100%;
  max-width: 770px;
  height: 100vh;
  top: 0;

  display: flex;
  justify-content: center;
  align-items: center;

  animation: ${iconShow} 1.8s;
`;

const Circle = styled.div`
  width: 115px;
  height: 115px;
  border-radius: 50%;
  background-color: ${({ backgroundColor }) => backgroundColor};
  color: ${({ color }) => color};
  opacity: 0.9;
  box-shadow: 0 0 8px gray;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  > svg {
    font-size: 45px;
  }

  > span {
    margin-top: 5px;
    font-size: 16px;
  }
`;
