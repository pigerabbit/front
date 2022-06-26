import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import * as Api from "api";

const SearchTrending = () => {
  const navigate = useNavigate();

  const [trendingKeyword, setTrendingKeyword] = useState([]);

  const getTrendingKeywords = async () => {
    try {
      const res = await Api.get("topics");
      setTrendingKeyword(res.data.payload);
    } catch (err) {
      //에러 처리
      console.log(err);
    }
  };

  useEffect(() => {
    getTrendingKeywords();
  }, []);

  return (
    <Container>
      <h4>인기검색어</h4>
      {trendingKeyword.map((keyword, idx) => (
        <KeywordWrapper
          key={idx}
          onClick={() =>
            navigate(`/products?search=${encodeURIComponent(keyword)}`)
          }
        >
          <KeywordNumber>{idx + 1}</KeywordNumber>
          <span>{keyword}</span>
        </KeywordWrapper>
      ))}
      {trendingKeyword.length === 0 && (
        <NoKeywordsContainer>
          <h3>최근 1시간 동안 검색된 키워드가 없습니다</h3>
        </NoKeywordsContainer>
      )}
    </Container>
  );
};

export default SearchTrending;

const Container = styled.div`
  width: 35%;
  border: 1px #dcdcde solid;
  border-radius: 5px;
  padding: 3.5%;
  @media only screen and (max-width: 400px) {
    min-width: 277px;
    margin-bottom: 3vh;
  }
`;

const KeywordWrapper = styled.div`
  width: 100%;
  margin: 25px 0;
  cursor: pointer;
  @media only screen and (max-height: 760px) {
    margin: 18px 0;
  }
`;

const KeywordNumber = styled.strong`
  margin-right: 8px;
  color: #f79831;
`;

const NoKeywordsContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  > h3 {
    font-size: 15px;
    color: #969696;
  }
`;
