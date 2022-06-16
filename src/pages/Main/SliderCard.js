import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as fullHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as Heart } from "@fortawesome/free-regular-svg-icons";

const url =
  "https://images.unsplash.com/photo-1630431341973-02e1b662ec35?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=60&raw_url=true&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTR8fHBvdGF0b3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500";

const SliderCard = ({ purchase }) => {
  const [product, setProduct] = useState({});

  const deadline = `${purchase.deadline.substr(
    0,
    4
  )}년 ${purchase.deadline.substr(5, 2)}월 ${purchase.deadline.substr(
    8,
    2
  )}일까지`;

  const getProductData = async () => {};

  useEffect(() => {
    getProductData();
  }, []);

  return (
    <Container>
      <Image url={url} />
      <Information>
        <CardTitle>
          <span>
            {purchase.groupType === "local" ? purchase.location : "택배공구"}
          </span>
          <span>싱싱한 왕딸기 공구해요!</span>
        </CardTitle>
        <Price>
          <span>{Math.floor((product.price - product.salePrice) / 100)}%</span>
          <span>{product.salePrice}원</span>
          <span>{product.price}원</span>
        </Price>
        <Deadline>
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

export default SliderCard;

const Container = styled.div`
  cursor: pointer;
  position: relative;
  box-sizing: border-box;
  padding: 10px;
  width: 100%;
  display: flex;

  > svg {
    position: absolute;
    right: 10px;
    bottom: 10px;
  }
`;

const Image = styled.div`
  width: 30vw;
  max-width: 200px;
  height: 30vw;
  max-height: 200px;
  border-radius: 5px;
  background-image: url(${({ url }) => url});
  background-size: 100%;
  background-position: center;
`;

const Information = styled.div`
  padding: 2.5vw 0;
  @media (min-width: 500px) {
    padding: 12px 0;
  }
  margin-left: 2vw;
  @media (min-width: 770px) {
    margin-left: 15px;
  }
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const CardTitle = styled.div`
  display: flex;
  flex-direction: column;

  > span:first-child {
    font-weight: 600;
    margin-bottom: 4px;
    font-size: 2.6vw;
    @media (min-width: 600px) {
      font-size: 15px;
    }
  }

  > span:last-child {
    font-size: 3.5vw;
    @media (min-width: 600px) {
      font-size: 22px;
    }
  }
`;

const Price = styled.div`
  font-size: 2.8vw;
  @media (min-width: 600px) {
    font-size: 17px;
  }
  font-weight: 600;

  > span:first-child {
    color: #ffb564;
    margin-right: 3px;
  }

  > span:last-child {
    font-size: 2.8vw;
    @media (min-width: 600px) {
      font-size: 15px;
    }
    color: #b1b1b1;
    text-decoration-line: line-through;
    margin-left: 5px;
  }
`;

const Deadline = styled.div`
  font-size: 3vw;
  @media (min-width: 600px) {
    font-size: 17px;
  }

  > div {
    margin-bottom: 4px;
    > span:first-child {
      color: #ff6a6a;
    }
  }

  > span {
    color: #969696;
  }
`;
