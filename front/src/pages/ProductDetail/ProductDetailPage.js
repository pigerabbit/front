import React, { useEffect, useState } from "react";
import styled, { css } from "styled-components";
import { useParams, useNavigate } from "react-router-dom";
import * as Api from "api";
import axios from "axios";

import { faUser, faHome } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import ProductTabs from "./ProductTabs";
import ProductExplanation from "./ProductDescriptionTab";

const ProductDetailPage = () => {
  const navigate = useNavigate();
  const [product, setProduct] = useState({
    _id: "628f8ecb036d5a2aff00705f",
    userId: "c5783003-712b-40f5-9903-0e81a05e8350",
    id: "4f92771e-8c93-49e4-b695-196052fec7de",
    images: "1653575371627287c901c9d1c353f.PNG",
    category: "meatEgg",
    name: "철물점에서 파는 계란이라니! 싱싱할 수 밖에!",
    description:
      "철물점에서 파는 계란이라니! 싱싱할 수 밖에 없지 않겠습니까? 너무 궁금하져?",
    descriptionImg: "16535753716287.PNG.png",
    price: 50000,
    salePrice: 35000,
    discountRate: 30,
    minPurchaseQty: 3,
    maxPurchaseQty: 3,
    views: 1,
    shippingFee: 3000,
    shippingFeeCon: 30000,
    detail: "상세 정보",
    detailImg: "1653575371637img.jpg",
    shippingInfo: "내용",
    policy: "교환환불",
    createdAt: "2022-05-26T14:29:31.693Z",
    updatedAt: "2022-05-26T14:29:31.693Z",
    __v: 0,
  });
  const [seller, setSeller] = useState({
    description: "설명이 아직 없습니다. 추가해 주세요.",
    _id: "628f88ea021dc6fbec6709cd",
    id: "c5783003-712b-40f5-9903-0e81a05e8350",
    name: "민호의 철물계란",
    email: "minho@naver.com",
    password: "$2b$10$5dpeXZDyd0aKmLzZE7vKyOpReX4hTmr0o7Qoc4Y/3Dw6kWfXMcfmS",
    business: "철물점",
    address: "중랑구 면목동",
    type: "sogongx2",
    createdAt: "2022-05-26T14:04:26.546Z",
    updatedAt: "2022-05-26T14:04:26.546Z",
    __v: 0,
  });

  const [currentTab, setCurrentTab] = useState({
    index: 0,
    name: "상품설명",
    content: <ProductExplanation product={product} seller={seller} />,
  });

  const productId = useParams().id;

  const getProductDetail = async () => {
    try {
      // const res = await Api.get(`products/${productId}`);
      const resProduct = await axios.get("/data/products.json");
      setProduct(resProduct.data.content[12]);
      const resSeller = await axios.get("/data/userList.json");
      const seller = resSeller.data.content.filter(
        (v) => product.userId === v.id
      );
      setSeller(seller[0]);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getProductDetail();
  }, []);

  return (
    <Container>
      <Top>
        <GoBack onClick={() => navigate("/products")} />
        <ProductTitle>{product.name}</ProductTitle>
        <ButtonTopContainer>
          <div
            id="home"
            onClick={() => {
              navigate("/home");
            }}
          >
            <FontAwesomeIcon
              icon={faHome}
              style={{ fontSize: "20px", color: "#f79831" }}
            />
          </div>
          <div
            id="user"
            onClick={() => {
              navigate("/user");
            }}
          >
            <FontAwesomeIcon
              icon={faUser}
              style={{ fontSize: "20px", color: "#f79831" }}
            />
          </div>
        </ButtonTopContainer>
      </Top>
      <ProductTabs
        product={product}
        seller={seller}
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        key={product.id}
      />
      {currentTab.content}
      <ButtonsContainer>
        <LeftButton position="left">공구 열기</LeftButton>
        <RightButton isFilled="true" position="right">
          공구 참여하기
        </RightButton>
      </ButtonsContainer>
    </Container>
  );
};

export default ProductDetailPage;

const Container = styled.div`
  position: relative;
  width: 770px;
  min-width: 360px;
  min-height: 100vh;
  background-color: #ffffff;
  "::-webkit-scrollbar-track" {
    background: none;
  }
  background-attachment: fixed;
`;

const Top = styled.header`
  width: 100%;
  background-color: #ffffff;
  height: 50px;
`;

const GoBack = styled.i`
  border: solid black;
  border-width: 0 1.5px 1.5px 0;
  display: inline-block;
  padding: 5px;
  margin: 20px 0 0 20px;
  transform: rotate(135deg);
  -webkit-transform: rotate(135deg);
  cursor: pointer;
`;

const ButtonTopContainer = styled.div`
  width: 55px;
  position: absolute;
  top: 18px;
  right: 20px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  #home,
  #user {
    cursor: pointer;
  }
`;

// const TabsContainer = styled.div`
//   width: 100%;
//   height: 50px;
//   display: flex;
//   flex-direction: row;
//   align-items: center;
//   justify-content: center;
//   border-bottom: solid #d0d0d0 1px;
// `;

// const Tab = styled.li`
//   width: 25%;
//   height: 100%;
//   list-style: none;
//   display: flex;
//   flex-direction: row;
//   align-items: center;
//   justify-content: center;
//   cursor: pointer;

//   background-color: #ffffff;
//   color: #636363;
//   font-weight: bold;
//   font-size: 15px;

//   &:hover {
//     border-bottom: solid #f79831 3px;
//     color: #f79831;
//   }
// `;

const ProductTitle = styled.p`
  margin-left: 10px;
  display: inline-block;
  width: 400px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  vertical-align: middle;

  @media (max-width: 500px) {
    width: 270px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`;

const ButtonsContainer = styled.div`
  position: fixed;
  bottom: 0px;
  left: 0px;
  right: 0px;
  max-width: 770px;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin: 0 auto;
  padding: 10px 0 10px 0;
  background-color: #ffffff;
`;

const LeftButton = styled.div`
  width: 48%;
  height: 65px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  cursor: pointer;
  font-weight: bold;
  margin: 0px 10px 0 20px;
  background-color: #ffffff;
  color: #f79831;
  border: 2px solid #f79831;

  &:hover {
    color: #636363;
    border-color: #636363;
  }
`;

const RightButton = styled.div`
  width: 48%;
  height: 65px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  cursor: pointer;
  font-weight: bold;
  margin: 0px 20px 0 10px;
  background-color: #f79831;
  color: #ffffff;

  &:hover {
    background-color: #636363;
  }
`;
