import React from "react";
import styled from "styled-components";

const UserButton = ({ children, handleClick, valid, width }) => {
  return (
    <Button onClick={handleClick} valid={valid} disabled={!valid} width={width}>
      {children}
    </Button>
  );
};

export default UserButton;

const Button = styled.button`
cursor: ${({ valid }) => (valid ? "pointer;" : "")};
  border: none;
  margin-left: ${({ width }) => (width === "short" ? "2%;" : "0px;")};
  width: ${({ width }) => (width === "short" ? "25%;" : "70%;")}
  max-width: 400px;
  height: 8vw;
  max-height: 40px;
  background-color: ${({ valid }) => (valid ? "#FFB564;" : "#D0D0D0")};
  color: white;
  box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.15);

  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2.5vw;
  @media (min-width: 500px) {
    font-size: 13px;
  }
`;
