import React from "react";
import styled from "styled-components";

const ProductInquiryTab = ({ product }) => {
  return <Container>{product.name}문의문의</Container>;
};

export default ProductInquiryTab;

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
