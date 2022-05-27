import { useState } from "react";
import styled from "styled-components";

const SearchCurrent = () => {
  const [currentKeyword, setCurrentKeyword] = useState([
    "냅킨",
    "감자",
    "샐러드",
    "삼겹살",
    "딸기",
  ]);
  return (
    <Container>
      <h3>최근 검색어</h3>
    </Container>
  );
};

export default SearchCurrent;

const Container = styled.div`
  width: 35%;
  height: 55vh;
  border: 1px #dcdcde solid;
  border-radius: 5px;
  padding: 3%;
  @media only screen and (max-width: 400px) {
    min-width: 280px;
  }
`;
