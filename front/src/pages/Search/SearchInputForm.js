import styled from "styled-components";
import {
  faArrowLeft,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const SearchInputForm = () => {
  return (
    <SearchInputWrapper>
      <ButtonWrapper>
        <FontAwesomeIcon
          icon={faArrowLeft}
          style={{ fontSize: "20px", color: "#C0C0C0" }}
        />
      </ButtonWrapper>
      <SearchInput placeholder="검색어를 입력해주세요" />
      <ButtonWrapper>
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
  margin-bottom: 5vh;
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
