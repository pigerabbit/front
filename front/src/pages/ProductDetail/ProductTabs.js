import React, { useState } from "react";
import styled from "styled-components";

import ProductExplanation from "./ProductDescriptionTab";
import ProductInformation from "./ProductInformationTab";
import ProductReview from "./ProductReviewTab";
import ProductInquiry from "./ProductInquiryTab";

const ProductTabs = ({
  product,
  seller,
  currentTab,
  setCurrentTab,
  productId,
}) => {
  const tabArr = [
    {
      index: 0,
      name: "상품설명",
      content: <ProductExplanation product={product} seller={seller} />,
    },
    {
      index: 1,
      name: "상세정보",
      content: <ProductInformation product={product} seller={seller} />,
    },
    {
      index: 2,
      name: "후기",
      content: <ProductReview product={product} seller={seller} />,
    },
    {
      index: 3,
      name: "문의",
      content: <ProductInquiry product={product} seller={seller} />,
    },
  ];

  const handleTab = (e) => {
    const clickedTab = tabArr.filter((v) => v.name === e.target.innerHTML)[0];
    setCurrentTab(clickedTab);
  };

  return (
    <>
      <TabsContainer>
        {tabArr.map((v, i) => (
          <Tab
            onClick={handleTab}
            isActive=""
            index={i}
            curIndex={currentTab.index}
          >
            {v.name}
          </Tab>
        ))}
      </TabsContainer>
    </>
  );
};

export default ProductTabs;

const TabsContainer = styled.div`
  position: relative;
  margin: 2px auto;
  width: 95%;
  height: 50px;
  display: flex;
  border-bottom: solid #d0d0d0 1px;
`;

const Tab = styled.li`
  width: 25%;
  height: 100%;
  list-style: none;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  background-color: #ffffff;
  color: ${({ index, curIndex }) =>
    index === curIndex ? "#f79831" : "#636363"};
  border-bottom: ${({ index, curIndex }) =>
    index === curIndex ? "solid #f79831 3px;" : "none"};
  font-weight: bold;
  font-size: 15px;

  &:hover {
    border-bottom: solid #f79831 3px;
    color: #f79831;
  }
`;
