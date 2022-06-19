import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useParams, useNavigate } from "react-router-dom";
import * as Api from "api";

import { faUser, faHome } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import DetailHeader from "components/DetailHeader";
import ProductTabs from "./ProductTabs";
import ProductDescriptionTab from "./ProductDescriptionTab";
import ProductInformationTab from "./ProductInformationTab";
import ProductReviewTab from "./ProductReviewTab";
import ProductInquiryTab from "./ProductInquiryTab";
import JoinGroupWindow from "pages/Group/joinGroup/JoinGroupWindow";

const ProductDetailPage = () => {
  const [product, setProduct] = useState({});
  const [seller, setSeller] = useState({});

  const [showJoinGroup, setShowJoinGroup] = useState(false);
  const [currentTab, setCurrentTab] = useState({
    index: -1,
    name: "fetch전",
  });

  const navigate = useNavigate();

  const productId = useParams().id;

  const getProductDetail = async () => {
    try {
      const res = await Api.get(`products/${productId}`);
      const resUser = await Api.get(`users/${res.data.payload.userId}`);
      setProduct(res.data.payload);
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
      <DetailHeader headerTitle={product.name} />
      <Tabs>
        <ProductTabs currentTab={currentTab} setCurrentTab={setCurrentTab} />
      </Tabs>
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
        {showJoinGroup && (
          <JoinGroupWindow
            productId={product.id}
            minPurchaseQty={product.minPurchaseQty}
            setShowJoinGroup={setShowJoinGroup}
          />
        )}
      </Body>
      <ButtonsContainer>
        <LeftButton
          position="left"
          onClick={() => {
            navigate(`/group/select`, { state: product });
          }}
        >
          공구 열기
        </LeftButton>
        <RightButton
          isFilled="true"
          position="right"
          onClick={() => setShowJoinGroup((cur) => !cur)}
        >
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

const Tabs = styled.header`
  position: fixed;
  width: 100%;
  min-width: 360px;
  max-width: 770px;
  top: 0;
  z-index: 5;
  top: 50px;
  background-color: #ffffff;
`;

const Body = styled.div`
  padding: 100px 0 75px 0;
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
