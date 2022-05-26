import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";

import BestProductCard from "./BestProductCard";

const BestTab = () => {
  const [products, setProducts] = useState([]);

  const getProductData = async () => {
    const data = await axios("/data/productsList.json", { method: "GET" });
    setProducts(data.data.productList);
  };

  useEffect(() => {
    getProductData();
  }, []);

  return (
    <Container>
      <Title>
        <span>잘나가는 판매상품 </span>
        <span>BEST 10</span>
      </Title>
      {products.map((product, index) => (
        <BestProductCard product={product} index={index} key={product.id} />
      ))}
    </Container>
  );
};

export default BestTab;

const Container = styled.div`
  position: relative;
  margin-top: 25px;
  margin-bottom: 120px;
  width: 84%;
  min-height: 90vh;
  left: 8%;
`;

const Title = styled.div`
  margin-bottom: 10px;
  font-size: 22px;
  font-weight: 600;

  span:last-child {
    color: #ff911b;
  }
`;
