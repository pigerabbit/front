import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import SearchProductCard from "./SearchProductCard";
import * as Api from "api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

const SearchCurrent = () => {
  const navigate = useNavigate();

  const [currentKeyword, setCurrentKeyword] = useState([]);
  const [productList, setProductList] = useState([]);
  const [loading, setLoading] = useState(false);

  const getSearchCurrent = async () => {
    const getSearchWords = Api.get("toggle/searchWords");
    const getSearchProducts = Api.get("toggle/viewedProducts");

    try {
      setLoading(true);

      const [currentKeyword, productList] = await Promise.all([
        getSearchWords,
        getSearchProducts,
      ]);

      setCurrentKeyword(currentKeyword.data.reverse());
      // const filteredProductList = productList.data.filter(
      //   (arr, index, callback) =>
      //     index === callback.findIndex((t) => t.id === arr.id)
      // );
      setProductList(productList.data);

      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  const deleteKeyword = async (e, keyword) => {
    e.stopPropagation();
    try {
      const filteredKeywords = await Api.delete(`toggle/searchWord/${keyword}`);
      setCurrentKeyword(filteredKeywords.data.searchWords.reverse());
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getSearchCurrent();
  }, []);
  return (
    <Container>
      {!loading && (
        <>
          <CurrentKeywordContainer>
            <h4>최근 검색어</h4>
            <CurrentKeywordWrapper>
              {currentKeyword.map((k, idx) => (
                <Keyword
                  key={idx}
                  onClick={() =>
                    navigate(`/products?search=${encodeURIComponent(k)}`)
                  }
                >
                  <span>{k}</span>
                  <button onClick={(e) => deleteKeyword(e, k)}>
                    <FontAwesomeIcon icon={faXmark} />
                  </button>
                </Keyword>
              ))}
              {currentKeyword.length === 0 && <p>검색 기록이 없습니다.</p>}
            </CurrentKeywordWrapper>
          </CurrentKeywordContainer>
          <CurrentProductContainer>
            <h4>최근 본 판매상품</h4>
            <CurrentProductWrapper>
              {productList.map((product) => (
                <SearchProductCard key={product.id} product={product} />
              ))}
            </CurrentProductWrapper>
          </CurrentProductContainer>
        </>
      )}
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
