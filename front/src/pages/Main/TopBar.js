import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

import { useNavigate } from "react-router-dom";

import CategoryButton from "../../components/CategoryButton";

const TopBar = ({ setSideBarTitle, setIsOpenSideBar }) => {
  const navigate = useNavigate();

  const handleClickBtn = (title) => {
    return () => {
      setSideBarTitle(title);
      setIsOpenSideBar(true);
    };
  };

  return (
    <Container>
      <CategoryButton handleClick={handleClickBtn("카테고리")} />

      <SearchButton
        onClick={() => {
          navigate("/search");
        }}
      >
        <span>어떤 판매 품목이 있을까요?</span>
        <FontAwesomeIcon icon={faMagnifyingGlass} size="1x" />
      </SearchButton>

      <AlarmButton onClick={handleClickBtn("알림")}>
        <FontAwesomeIcon icon={faBell} size="2x" />
      </AlarmButton>
    </Container>
  );
};

export default TopBar;

const Container = styled.div`
  width: 100%;
  height: 80px;
  background-color: #ffb564;
  border-radius: 0px 0px 30px 30px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.15);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
`;

const SearchButton = styled.div`
  cursor: pointer;
  margin: 0 30px;
  padding: 0 15px;
  width: 100%;
  height: 35px;
  background-color: white;
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.15);
  border-radius: 5px;

  display: flex;
  align-items: center;
  justify-content: space-between;
  color: #cccccc;
  font-size: 12px;
`;

const AlarmButton = styled.div`
  cursor: pointer;
  margin-right: 30px;
`;
