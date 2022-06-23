import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setBest } from "redux/productsSlice";
import styled from "styled-components";
import * as Api from "api";

import BestProductCard from "./BestProductCard";
import LoadingSpinner from "components/LoadingSpinner";

const BestTab = () => {
  const { bestProducts } = useSelector((state) => state.products);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const getProductData = async () => {
    try {
      setLoading(true);

      const res = await Api.get("products/main/top");
      dispatch(setBest(res.data.payload));

      setLoading(false);
    } catch (e) {
      // 에러처리
    }
  };

  useEffect(() => {
    if (bestProducts.length === 0) getProductData();
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
