import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ProductDescriptionTab = ({ product, seller }) => {
  const navigate = useNavigate();

  const {
    name,
    price,
    salePrice,
    discountRate,
    shippingFee,
    shippingFeeCon,
    images,
    description,
    descriptionImg,
  } = product;

  const [
    priceStr,
    salePriceStr,
    discountRateStr,
    shippingFeeStr,
    shippingFeeConStr,
  ] = [price, salePrice, discountRate, shippingFee, shippingFeeCon].map((v) =>
    v.toLocaleString()
  );

  let shippingConStr = "";
  if (shippingFeeCon > 0) {
    shippingConStr = ` (${shippingFeeConStr}원 이상 무료 배송)`;
  }

  return (
    <Container>
      <ImgContainer>
        <img id="productImg" src={images} alt={product.name + " 사진"} />
        {/* <img
          id="productImg"
          src="/test_images/strawberry.jpeg"
          alt={product.name + " 사진"}
        /> */}
      </ImgContainer>
      <Seller
        onClick={() => {
          navigate("/store");
        }}
      >
        {seller.businessName}
        <GoSeller />
      </Seller>
      <InfoContainer>
        {name}
        <PriceInfo>
          <DiscountRate>{discountRateStr}%</DiscountRate>
          <Price>
            <p id="salePrice">{salePriceStr} 원</p>
            <p id="price">{priceStr} 원</p>
          </Price>
        </PriceInfo>
        <p id="shippingFee">
          배송비 {shippingFeeStr}원{shippingConStr}
        </p>
      </InfoContainer>
      <DescriptionContainer>
        {description && <div>{description}</div>}
        {descriptionImg && (
          <img
            id="descriptionImg"
            src={descriptionImg}
            alt={name + " 설명 사진"}
          />
        )}
        {/* <img
          id="descriptionImg"
          src="/test_images/pigerabbit.png"
          alt={name + " 설명 사진"}
        /> */}
      </DescriptionContainer>
    </Container>
  );
};

export default ProductDescriptionTab;

const Container = styled.div`
  width: 100%;
  min-width: 360px;
  max-width: 770px;
  background-color: #ffffff;
`;

const ImgContainer = styled.div`
  width: 95%;
  margin: 0 auto;
  height: 360px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background-color: gray;

  #productImg {
    width: auto;
    height: 360px;
  }
`;

const Seller = styled.div`
  margin: 20px 0 15px 20px;
  font-size: 15px;
  font-weight: bold;
  cursor: pointer;
`;

const GoSeller = styled.i`
  border: solid black;
  border-width: 0 1px 1px 0;
  display: inline-block;
  padding: 5px;
  margin-left: 5px;
  transform: rotate(-45deg);
  -webkit-transform: rotate(-45deg);
`;

const InfoContainer = styled.div`
  margin-left: 20px;

  #shippingFee {
    margin-top: 10px;
    font-size: 13px;
  }
`;

const PriceInfo = styled.div`
  margin-top: 13px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
`;

const DiscountRate = styled.div`
  display: inline-block;
  font-size: 34px;
  color: #ff9b2f;
`;

const Price = styled.div`
  display: inline-block;
  margin-left: 10px;
  #salePrice {
    font-weight: bold;
    font-size: 20px;
  }
  #price {
    margin-top: 5px;
    font-size: 15px;
    color: #636363;
    text-decoration: line-through solid 1px;
  }
`;

const DescriptionContainer = styled.div`
  position: relative;
  margin: 15px auto;
  padding-top: 15px;
  width: 95%;
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: center;
  border-top: 1px solid #d0d0d0;

  img {
    width: 100%;
    height: auto;
  }
`;
