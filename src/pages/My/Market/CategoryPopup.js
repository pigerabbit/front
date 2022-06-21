import React from "react";
import styled from "styled-components";

import { parcelCategory, subscribeCategory } from "./CategoryModule";
import usePreventScroll from "hooks/usePreventScroll";

const parcelList = [];
for (const key in parcelCategory) {
  parcelList.push({ eng: key, kor: parcelCategory[key] });
}

const subscribeList = [];
for (const key in subscribeCategory) {
  subscribeList.push({ eng: key, kor: subscribeCategory[key] });
}

const CategoryPopup = ({ setIsCategoryPopup, setCategory, productType }) => {
  const handleCategoryClick = (category) => {
    setCategory(category);
    setIsCategoryPopup(false);
  };

  usePreventScroll();

  return (
    <Container
      onClick={() => {
        setIsCategoryPopup(false);
      }}
    >
      <CategoryContainer>
        {(productType === "parcel" ? parcelList : subscribeList).map(
          ({ eng, kor }) => (
            <Category
              key={eng}
              onClick={() => {
                handleCategoryClick(kor);
              }}
            >
              {kor}
            </Category>
          )
        )}
      </CategoryContainer>
    </Container>
  );
};

export default CategoryPopup;

const Container = styled.div`
  z-index: 11;
  position: fixed;
  background: rgba(0, 0, 0, 0.2);
  width: 100%;
  max-width: 770px;
  height: 100%;
  top: 0;

  display: flex;
  justify-content: center;
  align-items: center;
`;

const CategoryContainer = styled.div`
  background-color: white;
  width: 40%;
  min-width: 260px;
  height: 60%;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Category = styled.div`
  cursor: pointer;
  border-bottom: 1px solid #c0c0c0;
  box-sizing: border-box;
  width: 100%;
  height: 10%;

  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.3s;

  &:hover {
    background-color: #e0e0e0;
  }

  &:last-child {
    border-bottom: none;
  }
`;
