import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import * as Api from "api";

import ProductsTopBar from "./ProductsTopBar";
import ProductCard from "./ProductCard";
import SideBar from "components/SideBar";
import Category from "components/Category";
import TabBar from "components/TabBar";
import ConfirmationIcon from "components/ConfirmationIcon";

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
  const [confirmationIcon, setConfirmationIcon] = useState({
    show: false,
    backgroundColor: "#70BD86;",
    color: "",
    icon: "",
    text: "",
  });

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const category = searchParams.get("category");
  const search = searchParams.get("search");

  const getProductData = async () => {
    try {
      if (category) {
        const res = await Api.get("products", "", {
          page: 1,
          perPage: 6,
          category: category,
          option: option,
        });

        setProducts(res.data.payload.resultList);
        setTotalProductsNum(res.data.payload.len);
      } else {
        const res = await Api.get("products/search", "", {
          page: 1,
          perPage: 6,
          search: search,
          option: option,
        });
        setProducts(res.data.payload.resultList);
        setTotalProductsNum(res.data.payload.len);
      }
    } catch (e) {
      setProducts([]);
      setTotalProductsNum(0);
    }
  };

  useEffect(() => {
    getProductData();
  }, [option, category, search]);

  return (
    <Container noProduct={products?.length === 0}>
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

      {confirmationIcon.show && <ConfirmationIcon style={confirmationIcon} />}

      <ProductsCardContainer>
        {products.map((product) => (
          <ProductCard
            product={product}
            setConfirmationIcon={setConfirmationIcon}
            key={product.id}
          />
        ))}
      </ProductsCardContainer>

      {products?.length === 0 && (
        <NoProductContainer>
          <img
            src={`${process.env.PUBLIC_URL}/images/noProduct.svg`}
            alt="no product"
          />
          <span>상품이 존재하지 않습니다.</span>
        </NoProductContainer>
      )}

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
  padding-bottom: ${({ noProduct }) => (noProduct ? "0;" : "130px;")}
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

const NoProductContainer = styled.div`
  width: 100%;
  max-width: 770px;

  display: flex;
  flex-direction: column;
  align-items: center;

  > img {
    width: 50%;
  }

  > span {
    margin-top: 50px;
    font-size: 4vw;
    @media (min-width: 770px) {
      font-size: 32px;
    }
  }
`;
