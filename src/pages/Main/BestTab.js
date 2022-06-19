import React, { useEffect, useState } from "react";
import styled from "styled-components";
import * as Api from "api";

import BestProductCard from "./BestProductCard";
import LoadingSpinner from "components/LoadingSpinner";

const BestTab = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const getProductData = async () => {
    try {
      setLoading(true);

      const res = await Api.get("products/main/top");
      setProducts(res.data.payload);

      setLoading(false);
    } catch (e) {
      // 에러처리
    }
  };

  useEffect(() => {
    getProductData();
  }, []);

  return (
    <Container>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <Contents>
          <Title>
            <span>잘나가는 판매상품 </span>
            <span>BEST 10</span>
          </Title>
          {products.map((product, index) => (
            <BestProductCard product={product} index={index} key={product.id} />
          ))}
        </Contents>
      )}
    </Container>
  );
};

export default BestTab;

const Container = styled.div`
  position: relative;
  margin-top: 25px;
  margin-bottom: 120px;
  width: 84%;
  min-height: 70%;
  left: 8%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Contents = styled.div`
  width: 100%;
`;

const Title = styled.div`
  margin-bottom: 10px;
  font-size: 22px;
  font-weight: 600;

  span:last-child {
    color: #ff911b;
  }
`;
