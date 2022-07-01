import React from "react";
import styled from "styled-components";

import BestProductCard from "./BestProductCard";
import LoadingSpinner from "components/LoadingSpinner";

const BestTab = ({ loading, bestProducts }) => {
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
          {bestProducts.map((product, index) => (
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
