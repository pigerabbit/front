import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as fullHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as Heart } from "@fortawesome/free-regular-svg-icons";
import axios from "axios";

import ProductsTopBar from "./ProductsTopBar";
import ProductCard from "./ProductCard";
import SideBar from "components/SideBar";
import Category from "components/Category";
import TabBar from "components/TabBar";

const options = [
  { eng: "groups", kor: "추천순" },
  { eng: "salePrice", kor: "저가순" },
  { eng: "reviews", kor: "후기많은순" },
  { eng: "views", kor: "조회수순" },
];

const ProductsPage = () => {
  const [isOpenSideBar, setIsOpenSideBar] = useState(false);
  const [option, setOption] = useState("groups");
  const [products, setProducts] = useState([]);

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const category = searchParams.get("category");
  const search = searchParams.get("search");

  const getProductData = async () => {
    const data = await axios("/data/productsList.json", { method: "GET" });
    setProducts(data.data.productList);
  };

  useEffect(() => {
    getProductData();
    setOption("groups");
  }, [category, search]);

  return (
    <Container>
      <ProductsTopBar
        search={search}
        category={category}
        setIsOpenSideBar={setIsOpenSideBar}
      />

      <ProductsInfo>
        <span>총 120건</span>
        <SelectBox>
          {options.map(({ eng, kor }) => (
            <Option
              key={eng}
              selected={option === eng}
              onClick={() => {
                setOption(eng);
              }}
            >
              {kor}
            </Option>
          ))}
        </SelectBox>
      </ProductsInfo>

      <ProductsCardContainer>
        {products.map((product) => (
          <ProductCard product={product} key={product.id} />
        ))}
      </ProductsCardContainer>

      <SideBar
        title={"카테고리"}
        isOpenSideBar={isOpenSideBar}
        setIsOpenSideBar={setIsOpenSideBar}
      >
        <Category setIsOpenSideBar={setIsOpenSideBar} />
      </SideBar>

      <TabBar />
    </Container>
  );
};

export default ProductsPage;

const Container = styled.div`
  padding-bottom: 130px;
  position: relative;
  width: 100%;
  max-width: 770px;
  min-width: 360px;
  min-height: 100vh;
  background-color: #ffffff;
  overflow: hidden;
`;

const ProductsInfo = styled.div`
  width: 84%;
  margin: 25px 8%;
  margin-left: 8%;
  display: flex;
  align-items: center;
  font-size: 12px;
  @media (min-width: 600px) {
    font-size: 14px;
  }

  > span {
    font-weight: 600;
  }
`;

const SelectBox = styled.div`
  margin-left: 15px;
  display: flex;
`;

const Option = styled.div`
  cursor: pointer;
  padding: 6px 10px;
  margin: 0 2px;
  border-radius: 20px;
  transition: box-shadow 0.4s;
  ${({ selected }) => {
    if (selected) return "box-shadow: 0 0 6px #636363;";
  }}
  @media (max-width: 370px) {
    font-size: 11px;
  }
`;

const ProductsCardContainer = styled.div`
  width: 84%;
  margin-left: 8%;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 15px;
  @media (min-width: 600px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;
