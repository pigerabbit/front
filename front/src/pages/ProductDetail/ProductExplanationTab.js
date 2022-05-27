import React from "react";
import styled from "styled-components";

const ProductExplanation = ({ product }) => {
  return (
    <Container>
      {/* {product.name}상품설명 */}
      {/* <ProductImg src={product.img} alt={product.name} /> */}
      <ProductImg />
    </Container>
  );
};

export default ProductExplanation;

const Container = styled.div`
  position: relative;
  width: 100%;
  min-width: 360px;
  max-width: 770px;
  background-color: #ffffff;
  "::-webkit-scrollbar-track" {
    background: none;
  },
  padding: 10px;
`;

const ProductImg = styled.img`
  width: 100%;
  height: 100px;
  background-color: gray;
`;
