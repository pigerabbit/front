import React from "react";
import styled from "styled-components";

const ProductInformation = (product) => {
  return <Container>{product}정보정보</Container>;
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
  },
  padding: 10px;
`;
