import { useState } from "react";
import styled from "styled-components";
import { productList } from "./SearchMockData";
import ProductCard from "../../components/ProductCard";

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
      <CurrentKeywordContainer>
        <h4>최근 검색어</h4>
        <CurrentKeywordWrapper>
          {currentKeyword.map((k, idx) => (
            <Keyword key={idx}>{k}</Keyword>
          ))}
        </CurrentKeywordWrapper>
      </CurrentKeywordContainer>
      <CurrentProductContainer>
        <h4>최근 본 판매상품</h4>
        <CurrentProductWrapper>
          {productList.map((product) => (
            <ProductCard
              key={product.id}
              name={product.name}
              price={product.price}
              salePrice={product.salePrice}
              discountRate={product.discountRate}
            />
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
  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    display: none;
  }
  @media only screen and (max-height: 760px) {
    margin: 18px 0;
  }
`;

const Keyword = styled.button`
  width: 90px;
  height: 35px;
  margin-right: 10px;
  border-radius: 16px;
  background: #ffe9d1;
  color: #ff8500;
  font-weight: 500;
  border: none;
  box-shadow: 2px 2px 3px rgba(0, 0, 0, 0.15);
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
