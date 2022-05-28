import React from "react";
import styled from "styled-components";

import ProductInfoCard from "./ProductInfoCard";

const ProductInformation = ({ product, seller }) => {
  const { detail, detailImg, shippingInfo, policy } = product;
  console.log(detail, detailImg, shippingInfo, policy);
  const info = [
    { title: "상품 상세 정보", content: detail, img: detailImg },
    { title: "배송 안내", content: shippingInfo },
    { title: "교환 및 환불 안내", content: policy },
  ];
  return (
    <Container>
      {info.map((v) => (
        <ProductInfoCard title={v.title} content={v.content} img={v.img} />
      ))}
    </Container>
  );
};

export default ProductInformation;

const Container = styled.div`
  position: relative;
  width: 100%;
  min-width: 360px;
  max-width: 770px;
  background-color: #ffffff;
  "::-webkit-scrollbar-track" {
    background: none;
  }
  margin-top: 7px;
`;
