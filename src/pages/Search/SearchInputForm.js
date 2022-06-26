import { useState } from "react";
import styled from "styled-components";
import {
  faArrowLeft,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";

const SearchInputForm = () => {
  const navigate = useNavigate();

  const [searchKeyword, setSearchKeyword] = useState("");

  const handleKeyPress = (key) => {
    if (key === "Enter") {
      navigate(`/products?search=${encodeURIComponent(searchKeyword)}`);
    }
  };

  return (
    <SearchInputWrapper>
      <ButtonWrapper>
        <FontAwesomeIcon
          icon={faArrowLeft}
          style={{ fontSize: "20px", color: "#C0C0C0" }}
          onClick={() => navigate("/")}
        />
      </ButtonWrapper>
      <SearchInput
        placeholder="검색어를 입력해주세요"
        onChange={(e) => setSearchKeyword(e.target.value)}
        onKeyPress={(e) => handleKeyPress(e.key)}
      />
      <ButtonWrapper
        onClick={() =>
          navigate(`/products?search=${encodeURIComponent(searchKeyword)}`)
        }
      >
        <FontAwesomeIcon
          icon={faMagnifyingGlass}
          style={{ fontSize: "25px", color: "#f79831" }}
        />
      </ButtonWrapper>
    </SearchInputWrapper>
  );
};

export default SearchInputForm;

const SearchInputWrapper = styled.div`
  width: 100%;
  height: 60px;
  border-bottom: solid 2px #f79831;
  display: flex;
  margin-bottom: 3vh;
`;

const SearchInput = styled.input`
  box-sizing: border-box;
  width: 80%;
  height: 100%;
  border: none;
  font-size: 20px;
  &:focus {
    outline: none;
  }
  &::placeholder {
    color: #c0c0c0;
  }
`;

const ButtonWrapper = styled.button`
  width: 10%;
  height: 100%;
  border: none;
  background: transparent;
  cursor: pointer;
`;
