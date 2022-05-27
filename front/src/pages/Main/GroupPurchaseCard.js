import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as fullHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as Heart } from "@fortawesome/free-regular-svg-icons";
import axios from "axios";

// styles props 예시
// const styles = {
//     cardHeight: 85,
//     titleSize: 14,
//     priceSize: 12,
//     deadlineSize: 12,
//   };
const GroupPurchaseCard = ({ styles, purchase }) => {
  const [product, setProduct] = useState({});

  const deadline = `${purchase.deadline.substr(
    0,
    4
  )}년 ${purchase.deadline.substr(5, 2)}월 ${purchase.deadline.substr(
    8,
    2
  )}일까지`;

  const getProductData = async () => {
    const data = await axios("/data/productsList.json", { method: "GET" });
    const index = data.data.productList.findIndex(
      (product) => product.id === purchase.productId
    );
    setProduct(data.data.productList[index]);
  };

  useEffect(() => {
    getProductData();
  }, []);

  return (
    <Container height={styles.cardHeight}>
      <img src="https://images.unsplash.com/photo-1630431341973-02e1b662ec35?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=60&raw_url=true&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTR8fHBvdGF0b3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500" />
      <Information>
        <CardTitle size={styles.titleSize}>
          <span>
            {purchase.groupType === "local" ? purchase.location : "택배공구"}
          </span>
          <span>싱싱한 왕딸기 공구해요!</span>
        </CardTitle>
        <Price size={styles.priceSize}>
          <span>{Math.floor((product.price - product.salePrice) / 100)}%</span>
          <span>{product.salePrice}원</span>
          <span>{product.price}원</span>
        </Price>
        <Deadline size={styles.deadlineSize}>
          <div>
            <span>3개</span>
            <span> 남음</span>
          </div>
          <span>{deadline}</span>
        </Deadline>
      </Information>
      <FontAwesomeIcon icon={fullHeart} size="1x" />
    </Container>
  );
};

export default GroupPurchaseCard;

const Container = styled.div`
  cursor:pointer;
  position: relative;
  width: 100%;
  display: flex;

  > img {
    width: ${({ height }) => height + "px;"}
    height: ${({ height }) => height + "px;"}
    border-radius:5px;
  }

  > svg {
    position: absolute;
    right: 0;
    bottom: 0;
  }
`;

const Information = styled.div`
  padding-top: 2px;
  margin-left: 5px;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const CardTitle = styled.div`
  display: flex;
  flex-direction: column;

  > span:first-child {
    font-size: ${({ size }) => size * 0.85 + "px;"}
    font-weight: 600;
    margin-bottom: 2px;
  }

  > span:last-child {
    font-size: ${({ size }) => size + "px;"}
  }
`;

const Price = styled.div`
  font-size: ${({ size }) => size + "px;"}
  font-weight: 600;

  > span:first-child {
    color: #ffb564;
    margin-right: 3px;
  }

  > span:last-child {
    font-size: ${({ size }) => size * 0.95 + "px;"}
    color: #b1b1b1;
    text-decoration-line: line-through;
    margin-left: 5px;
  }
`;

const Deadline = styled.div`
  font-size: ${({ size }) => size + "px;"};

  > div {
    margin-bottom: 3px;
    > span:first-child {
      color: #ff6a6a;
    }
  }

  > span {
    color: #969696;
  }
`;
