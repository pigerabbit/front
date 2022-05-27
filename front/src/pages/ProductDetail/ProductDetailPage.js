import React, { useEffect, useState } from "react";
import styled, { css } from "styled-components";
import { useParams, useNavigate } from "react-router-dom";
import * as Api from "api";
import axios from "axios";

import { faUser, faHome } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import ProductTabs from "./ProductTabs";
import ProductExplanation from "./ProductExplanationTab";

const ProductDetailPage = () => {
  const navigate = useNavigate();
  const [product, setProduct] = useState({});
  const [currentTab, setCurrentTab] = useState({
    index: 0,
    name: "상품설명",
    content: <ProductExplanation product={product} />,
  });

  const productId = useParams().id;

  const getProductDetail = async () => {
    try {
      // const res = await Api.get(`products/${productId}`);
      const res = await axios.get("/data/products.json");
      setProduct(res.data.content[0]);
      console.log(product);
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
  },
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
  top: 20px;
  right: 25px;
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
  display: inline-block;
  margin-left: 10px;
`;

const ButtonsContainer = styled.div`
  position: absolute;
  bottom: 30px;
  width: 100%;
  height: 50px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
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
