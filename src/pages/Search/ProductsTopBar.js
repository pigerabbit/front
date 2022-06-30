import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faDeleteLeft } from "@fortawesome/free-solid-svg-icons";

import CategoryButton from "../../components/CategoryButton";

const categoryList = {
  fruitVegetable: "과일·채소",
  cereal: "견과·쌀",
  seafood: "수산·해산·건어물",
  meatEgg: "정육·달걀",
  noddleSpice: "면·양념·오일",
  drink: "생수·음료·우유",
  coffeeAlcohol: "커피·주류",
  living: "생활용품·리빙",
  kitchen: "주방용품",
  other: "기타",
  food: "음식",
  cafe: "카페·디저트",
  health: "운동·헬스",
  beauty: "미용·뷰티·네일",
  stay: "숙박·펜션·모텔",
  pet: "애견·반려동물",
  study: "스터디·학원·교육",
  class: "공방·클래스",
  game: "오락·여가·레저",
  culture: "문화·예술",
  else: "기타",
};

const ProductsTopBar = ({ search, category, setIsOpenSideBar }) => {
  const [searchText, setSearchText] = useState(search);

  const navigate = useNavigate();

  const handlePreviousBtnClick = () => {
    navigate(-1, { replace: true });
  };

  const handleCategoryBtnClick = () => {
    setIsOpenSideBar(true);
  };

  const handleInputChange = (e) => {
    setSearchText(e.target.value);
  };

  const handleDeleteBtnClick = () => {
    setSearchText("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!searchText) return;

    navigate(`/products?search=${encodeURIComponent(searchText)}`);
  };

  return (
    <TopBar>
      <FontAwesomeIcon icon={faArrowLeft} onClick={handlePreviousBtnClick} />
      {category && (
        <>
          <span>{categoryList[category]}</span>
          <CategoryButton
            color={"#939393"}
            handleClick={handleCategoryBtnClick}
          />
        </>
      )}

      {!category && (
        <>
          <form onSubmit={handleSubmit}>
            <input
              placeholder="검색어를 입력해주세요."
              value={searchText}
              onChange={handleInputChange}
            />
          </form>
          <FontAwesomeIcon icon={faDeleteLeft} onClick={handleDeleteBtnClick} />
        </>
      )}
    </TopBar>
  );
};

export default ProductsTopBar;

const TopBar = styled.div`
  box-shadow: 0 4px 8px -4px #dadada;
  box-sizing: border-box;
  width: 100%;
  height: 10vh;
  min-height: 70px;
  padding: 0 5vw;
  @media (min-width: 770px) {
    padding: 0 40px;
  }
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 24px;
  color: #636363;

  svg {
    cursor: pointer;
  }

  > span {
    @media (max-width: 500px) {
      font-size: 20px;
    }
    @media (min-width: 500px) and (max-width: 600px) {
      font-size: 22px;
    }
  }

  > form {
    flex-grow: 1;
    margin: 0 20px -3px 20px;
    height: 50%;

    > input {
      box-sizing: border-box;
      border: none;
      border-bottom: 1px solid white;
      width: 100%;
      height: 100%;
      padding: 0 1.5vw;
      font-size: 20px;
      @media (min-width: 770px) {
        padding: 12px;
      }
      transition: border-bottom 0.25s;

      &:focus {
        outline: none;
      }
    }
  }
`;
