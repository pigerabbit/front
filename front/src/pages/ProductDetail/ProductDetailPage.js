import React from "react";
import styled from "styled-components";

const ProductDetailPage = () => {
  return (
    <Container>{/* 탭바 안쓰이는 페이지에서는 지워주시면 됩니다. */}</Container>
  );
};

export default ProductDetailPage;

const Container = styled.div`
  position: relative;
  width: 770px;
  min-width: 360px;
  min-height: 100vh;
  background-color: #ffffff;
  "::-webkit-scrollbar-track" {
    background: none;
  },
`;
