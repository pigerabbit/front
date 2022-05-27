import React from "react";
import styled from "styled-components";

const ProductInquiry = ({ product }) => {
  return <Container>{product.name}문의문의</Container>;
};

export default ProductInquiry;

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
