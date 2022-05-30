import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import * as Api from "api";

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
  const [totalProductsNum, setTotalProductsNum] = useState([]);

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const category = searchParams.get("category");
  const search = searchParams.get("search");

  const getProductData = async () => {
    try {
      if (category) {
        console.log("hi");
      } else {
        const data = await Api.get("products/search", "", {
          page: 1,
          perPage: 6,
          search: search,
          option: option,
        });
        setProducts(data.data.productList);
        setTotalProductsNum(data.data.len);
      }
    } catch (e) {
      console.log(e.response.data.errorMessage);
    }
  };

  useEffect(() => {
    getProductData();
  }, [option, category, search]);

  return (
    <Container>
      <ProductsTopBar
        search={search}
        category={category}
        setIsOpenSideBar={setIsOpenSideBar}
      />

      <ProductsInfo>
        <span>총 {totalProductsNum}건</span>
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
  @media (min-width: 600px) {
    margin-top: 50px;
  }
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 15px;
  @media (min-width: 600px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;
