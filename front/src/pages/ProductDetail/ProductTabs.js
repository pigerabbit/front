import React, { useState } from "react";
import styled from "styled-components";

import ProductExplanation from "./ProductExplanationTab";
import ProductInformation from "./ProductInformationTab";
import ProductReview from "./ProductReviewTab";
import ProductInquiry from "./ProductInquiryTab";

const ProductTabs = ({ product, currentTab, setCurrentTab }) => {
  const tabArr = [
    { index: 0, name: "상품설명", content: ProductExplanation(product) },
    { index: 1, name: "상세정보", content: ProductInformation(product) },
    { index: 2, name: "후기", content: ProductReview(product) },
    { index: 3, name: "문의", content: ProductInquiry(product) },
  ];

  const handleTab = (e) => {
    const clickedTab = tabArr.filter((v) => v.name === e.target.innerHTML)[0];
    setCurrentTab(clickedTab);
  };

  return (
    <>
      <TabsContainer>
        {tabArr.map((v) => (
          <Tab onClick={handleTab} isActive="">
            {v.name}
          </Tab>
        ))}
      </TabsContainer>
      <TabLine currentTab={currentTab} />
    </>
  );
};

export default ProductTabs;

const TabsContainer = styled.div`
  position: relative;
  margin: 5px 0 5px 0;
  left: 5%;
  width: 90%;
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
  color: #636363;
  font-weight: bold;
  font-size: 15px;

  &:hover {
    border-bottom: solid #f79831 3px;
    color: #f79831;
  }
`;

const TabLine = styled.div`
  position: absolute;
  background-color: black;
  margin: 0px;
  width: 25%;
  height: 3px;
  left: ${({ currentTab }) => {
    if (currentTab.name === "상품설명") return "0;";
    else if (currentTab.name === "상세정보") return "33.4%;";
    else if (currentTab.name === "후기") return "66.7%;";
    else if (currentTab.name === "문의") return "75%";
  }}
  bottom: 0;
  transition: left 0.4s;
`;
