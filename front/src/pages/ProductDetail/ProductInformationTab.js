import React from "react";
import styled from "styled-components";

import ProductInfoCard from "./ProductInfoCard";

const ProductInformationTab = ({ product, seller }) => {
  const { detail, detailImg, shippingInfo } = product;
  const policy = `교환 및 환불이 필요하신 경우, 상단의 '문의'에 남겨주세요!
  `;

  const info = [
    { title: "상품 상세 정보", content: detail, img: detailImg },
    { title: "배송 안내", content: shippingInfo },
    { title: "교환 및 환불 안내", content: policy },
  ];
  return (
    <Container>
      {info.map((v, i) => (
        <ProductInfoCard
          title={v.title}
          content={v.content}
          img={v.img}
          key={i}
        />
      ))}
    </Container>
  );
};

export default ProductInformationTab;

const Container = styled.div`
  width: 100%;
  min-width: 360px;
  max-width: 770px;
  background-color: #ffffff;
  margin-top: 7px;
`;
