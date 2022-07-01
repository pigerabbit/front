import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import SearchProductCard from "./SearchProductCard";
import * as Api from "api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

const SearchCurrent = ({ viewedKeyword, viewedProductList }) => {
  const navigate = useNavigate();

  const [keyword, setKeyword] = useState(viewedKeyword);

  const deleteKeyword = (keyword) => async (e) => {
    e.stopPropagation();
    try {
      const encodingKeyword = encodeURIComponent(keyword);
      const filteredKeywords = await Api.delete(
        `toggle/searchWord/${encodingKeyword}`
      );
      setKeyword(filteredKeywords.data.searchWords.reverse());
    } catch (err) {
      console.log(err);
    }
  };

  const goToProductPage = (k) => () =>
    navigate(`/products?search=${encodeURIComponent(k)}`);

  return (
    <Container>
      <CurrentKeywordContainer>
        <h4>최근 검색어</h4>
        <CurrentKeywordWrapper>
          {keyword.map((k, idx) => (
            <Keyword key={idx} onClick={goToProductPage(k)}>
              <span>{k}</span>
              <button onClick={deleteKeyword(k)}>
                <FontAwesomeIcon icon={faXmark} />
              </button>
            </Keyword>
          ))}
          {keyword.length === 0 && <p>검색 기록이 없습니다.</p>}
        </CurrentKeywordWrapper>
      </CurrentKeywordContainer>
      <CurrentProductContainer>
        <h4>최근 본 판매상품</h4>
        <CurrentProductWrapper>
          {viewedProductList.map((product) => (
            <SearchProductCard key={product.id} product={product} />
          ))}
        </CurrentProductWrapper>
      </CurrentProductContainer>
    </Container>
  );
};

export default SearchCurrent;

const Container = styled.div`
  width: 35%;
  height: 55vh;
  border: 1px #dcdcde solid;
  border-radius: 5px;
  padding: 3.5%;
  @media only screen and (max-width: 400px) {
    min-width: 277px;
    margin-bottom: 3vh;
  }
`;

const CurrentKeywordContainer = styled.div`
  width: 100%;
  height: 25%;
  margin: auto;
  @media only screen and (max-width: 400px) {
    height: 30%;
  }
`;

const CurrentProductContainer = styled.div`
  width: 100%;
  height: 75%;
  @media only screen and (max-width: 400px) {
    height: 70%;
  }
`;

const CurrentKeywordWrapper = styled.div`
  width: 100%;
  height: 100%;
  white-space: nowrap;
  overflow-x: scroll;
  margin: 25px 0;
  display: flex;
  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    display: none;
  }
  @media only screen and (max-height: 760px) {
    margin: 18px 0;
  }
  > p {
    margin-top: 10px;
    color: #a0a0a0;
  }
`;

const Keyword = styled.div`
  display: flex;
  padding: 0 3%;
  height: 35px;
  box-sizing: border-box;
  text-align: center;
  line-height: 35px;
  margin-right: 10px;
  border-radius: 16px;
  background: #ffe9d1;
  border: none;
  box-shadow: 2px 2px 3px rgba(0, 0, 0, 0.15);
  cursor: pointer;
  > span {
    color: #ff8500;
    font-weight: 500;
    font-size: 15px;
  }
  > button {
    background: transparent;
    border: none;
    margin-left: 5%;
    color: #969696;
    cursor: pointer;
  }
`;

const CurrentProductWrapper = styled.div`
  width: 100%;
  height: 90%;
  overflow-y: scroll;
  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    display: none;
  }
  margin: 10px 0;
`;
