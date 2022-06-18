import React from "react";
import styled, { keyframes } from "styled-components";

const LoadingSpinner = () => {
  return (
    <Loading>
      <div></div>
      <div></div>
      <div></div>
    </Loading>
  );
};

export default LoadingSpinner;

const rotate = keyframes`
  0% {
    transform: rotate(0);
  }
  25% {
    transform: rotate(180deg);
  }
  50% {
    transform: rotate(180deg);
  }
  75% {
    transform: rotate(360deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const Loading = styled.div`
  margin-top: 40px;
  margin-bottom: 20px;
  width: 100px;
  height: 100px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  animation: ${rotate} 2s linear infinite;

  > div {
    background-color: #f79831;
    width: 9px;
    height: 9px;
    border-radius: 50%;
  }
`;
