import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate, useSearchParams } from "react-router-dom";
import * as Api from "api";

const ProductDetailTop = ({ group, product, seller }) => {
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const imminent = searchParams.get("imminent");

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
        <img id="productImg" src={images} alt={name + " 사진"} />
      </ImgContainer>
      <Seller>
        {seller.business[0].businessName}
        <GoToProduct
          onClick={() => {
            navigate(`/products/${product.id}`);
          }}
        >
          판매 페이지로 이동
        </GoToProduct>
      </Seller>
      <InfoContainer>
        {group.groupName}
        <span>
          <p>~ {group.deadline}</p>
          <Deadline>
            {imminent && <p id="imminent">"마감 임박"</p>}
            <p id="remain">{group.remainedPersonnel}개</p> 남음
          </Deadline>
        </span>
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
      </DescriptionContainer>
    </Container>
  );
};

export default ProductDetailTop;

const Container = styled.div`
  width: 100%;
  min-width: 360px;
  max-width: 770px;
  background-color: #ffffff;
  padding-top: 50px;
`;

const ImgContainer = styled.div`
  width: 95%;
  margin: 0 auto;
  height: 360px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background-color: #f8f8f8;

  #productImg {
    width: auto;
    height: 360px;
  }
`;

const Seller = styled.div`
  margin: 20px 0 13px 20px;
  font-size: 15px;
  font-weight: bold;
  display: flex;
  align-items: center;
`;

const GoToProduct = styled.div`
  width: 120px;
  height: 30px;
  color: #ffffff;
  background-color: #ffb564;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  font-size: 13px;
  margin-left: 10px;

  cursor: pointer;
`;

const InfoContainer = styled.div`
  margin-left: 20px;

  #shippingFee {
    margin-top: 10px;
    font-size: 13px;
  }

  > span {
    position: absolute;
    right: 30px;
    color: #ff0000;
  }

  > span > p {
    color: #f79831;
    font-weight: bold;
  }
`;

const Deadline = styled.div`
  display: flex;
  flex-direction: row;
  align-items: baseline;
  margin-top: 10px;
  color: #000000;

  font-size: 23px;

  #imminent {
    color: #ff0000;
    font-weight: bold;
    font-size: 13px;
    margin-right: 5px;
  }

  #remain {
    font-weight: bold;
    margin-right: 5px;
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
