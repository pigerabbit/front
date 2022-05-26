import styled from "styled-components";
import SearchInputForm from "./SearchInputForm";
const SearchPage = () => {
  const trending = [
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
  ];
  return (
    <Container>
      <SearchInputForm />
      <SearchContentContainer>
        <SearchContentWrapper>
          <h3>인기검색어</h3>
          {trending.map((keyword, idx) => (
            <KeywordWrapper>
              <KeywordNumber>{idx + 1}</KeywordNumber>
              <span>{keyword}</span>
            </KeywordWrapper>
          ))}
        </SearchContentWrapper>
        <SearchContentWrapper>
          <h4>최근 검색어</h4>
        </SearchContentWrapper>
      </SearchContentContainer>
    </Container>
  );
};

export default SearchPage;

const Container = styled.div`
  position: relative;
  width: 100%;
  max-width: 770px;
  min-width: 360px;
  min-height: 100vh;
  background-color: #ffffff;
  "::-webkit-scrollbar-track" {
    background: none;
  }
`;

const SearchContentContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
`;

const SearchContentWrapper = styled.div`
  width: 35%;
  height: 55vh;
  border: 1px #dcdcde solid;
  border-radius: 5px;
  padding: 3%;
`;

const KeywordWrapper = styled.div`
  width: 100%;
  margin: 25px 0;
`;

const KeywordNumber = styled.strong`
  margin-right: 8px;
  color: #f79831;
`;
