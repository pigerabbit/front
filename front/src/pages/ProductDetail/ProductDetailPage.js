import React, { useEffect, useState } from "react";
import styled, { css } from "styled-components";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import * as Api from "api";
import axios from "axios";

import { faUser, faHome } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import ProductTabs from "./ProductTabs";
import ProductDescriptionTab from "./ProductDescriptionTab";
import ProductInformationTab from "./ProductInformationTab";
import ProductReviewTab from "./ProductReviewTab";
import ProductInquiryTab from "./ProductInquiryTab";

const ProductDetailPage = () => {
  // const { user } = useSelector((state) => state.user, shallowEqual);

  const navigate = useNavigate();
  // const dispatch = useDispatch();

  const [product, setProduct] = useState({});
  const [seller, setSeller] = useState({});

  const [currentTab, setCurrentTab] = useState({
    index: -1,
    name: "fetch전",
  });

  const productId = useParams().id;

  const getProductDetail = async () => {
    try {
      const res = await Api.get(`products/${productId}`);
      const resUser = await Api.get(
        `users/${res.data.payload.resultProduct.userId}`
      );
      setProduct(res.data.payload.resultProduct);
      setSeller(resUser.data.payload);
      setCurrentTab({
        index: 0,
        name: "상품설명",
      });
    } catch (e) {
      console.log("product 못 가져옴");
    }
  };

  useEffect(() => {
    try {
      getProductDetail();
    } catch (e) {
      console.log();
    }
  }, []);

  return (
    <Container>
      <Header>
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
        <ProductTabs currentTab={currentTab} setCurrentTab={setCurrentTab} />
      </Header>
      <Body>
        {currentTab.index === 0 && (
          <ProductDescriptionTab product={product} seller={seller} />
        )}
        {currentTab.index === 1 && (
          <ProductInformationTab product={product} seller={seller} />
        )}
        {currentTab.index === 2 && (
          <ProductReviewTab product={product} seller={seller} />
        )}
        {currentTab.index === 3 && (
          <ProductInquiryTab product={product} seller={seller} />
        )}
      </Body>
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
  height: 100vh;
  background-color: #ffffff;
`;

const Header = styled.header`
  position: fixed;
  width: 100%;
  min-width: 360px;
  max-width: 770px;
  top: 0;
  z-index: 5;
  background-color: #ffffff;
`;

const Body = styled.div`
  padding: 100px 0 65px 0;
`;

const Top = styled.div`
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
  width: 60px;
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
  z-index: 5;
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
