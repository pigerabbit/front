import React from 'react';
import styled, { keyframes } from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useSelector } from 'react-redux';

const ConfirmationIcon = () => {
  const { show, backgroundColor, color, icon, text } = useSelector((state) => {
    return state.confirmationIcon;
  });

  if (!show) {
    return null;
  }

  return (
    <Container data-testid='confirmation-container' show={show}>
      <Circle
        data-testid='confirmation-circle'
        backgroundColor={backgroundColor}
        color={color}
      >
        <FontAwesomeIcon data-testid='confirmation-icon' icon={icon} />
        <span data-testid='confirmation-text'>{text}</span>
      </Circle>
    </Container>
  );
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
  width: 15vw;
  max-width: 115px;
  height: 15vw;
  max-height: 115px;
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
    font-size: 6vw;
    @media (min-width: 770px) {
      font-size: 47px;
    }
  }

  > span {
    margin-top: 5px;
    font-size: 2vw;
    @media (min-width: 770px) {
      font-size: 15.5px;
    }
  }
`;
