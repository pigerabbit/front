import React from "react";
import styled from "styled-components";

const ProductReview = ({ product }) => {
  return <Container>{product.name}후기후기</Container>;
};

export default ProductReview;

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
