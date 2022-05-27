import { useState } from "react";
import styled from "styled-components";

const SearchTrending = () => {
  const [trendingKeyword, setTrendingKeyword] = useState([
    "피클",
    "라이스 페이퍼",
    "사과",
    "나쵸",
    "배",
    "원두",
    "감자",
    "바나나",
    "딸기",
    "샐러드",
  ]);
  return (
    <Container>
      <h3>인기검색어</h3>
      {trendingKeyword.map((keyword, idx) => (
        <KeywordWrapper>
          <KeywordNumber>{idx + 1}</KeywordNumber>
          <span>{keyword}</span>
        </KeywordWrapper>
      ))}
    </Container>
  );
};

export default SearchTrending;

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

const KeywordWrapper = styled.div`
  width: 100%;
  margin: 25px 0;
  @media only screen and (max-height: 760px) {
    margin: 18px 0;
  }
`;

const KeywordNumber = styled.strong`
  margin-right: 8px;
  color: #f79831;
`;
