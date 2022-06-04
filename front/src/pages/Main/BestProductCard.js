import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as fullHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as Heart } from "@fortawesome/free-regular-svg-icons";

const category = {
  fruitVegetable: "과일·채소",
  cereal: "견과·쌀",
  seafood: "수산·해산·건어물",
  meatEgg: "정육·달걀",
  noddleSpice: "면·양념·오일",
  drink: "생수·음료·우유",
  coffeeAlcohol: "커피·주류",
  living: "생활용품·리빙",
  kitchen: "주방용품",
  other: "기타",
};

const BestProductCard = ({ product, index }) => {
  const navigate = useNavigate();
  const [wish, setWish] = useState(product.wish);

  console.log(product);

  return (
    <Container wish={wish}>
      <span>{index + 1}</span>
      <Image
        url={product.images}
        onClick={() => {
          navigate(`/products/${product.id}`);
        }}
      />
      <Information
        onClick={() => {
          navigate(`/products/${product.id}`);
        }}
      >
        <Title>
          <span>[{category[product.category]}]</span>
          <span>{product.name}</span>
        </Title>
        <Price>
          <span>{product.price}원</span>
          <div className="sale-price">
            <span>{product.discountRate}%</span>
            <span>{product.salePrice}원</span>
          </div>
        </Price>
      </Information>
      <span
        onClick={() => {
          setWish((cur) => !cur);
        }}
      >
        {wish && <FontAwesomeIcon icon={fullHeart} />}
        {!wish && <FontAwesomeIcon icon={Heart} />}
      </span>
    </Container>
  );
};

export default BestProductCard;

const Container = styled.div`
  position: relative;
  border-bottom: #cdcdcd solid 1px;
  width: 100%;
  height: 120px;
  display: flex;
  align-items: center;

  > span:first-child {
    font-size: 20px;
    font-weight: 500;
    width: 40px;
    text-align: center;
  }

  > span:last-child {
    cursor: pointer;
    position: absolute;
    right: 0;
    bottom: 14px;
    color: ${({ wish }) => {
      if (wish) return "#FF6A6A;";
      else return "#9c9c9c;";
    }};
  }
`;

const Image = styled.div`
  cursor: pointer;
  width: 85px;
  height: 85px;
  border-radius: 10px;
  background-image: url(${({ url }) => url});
  background-size: 100%;
  background-position: center;
`;

const Information = styled.div`
  cursor: pointer;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  height: 100%;
  flex-grow: 1;
  padding: 18px 0 18px 14px;
`;

const Title = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 15px;
  > span {
    margin-bottom: 3px;
  }
`;

const Price = styled.div`
  display: flex;
  flex-direction: column;

  > span {
    font-size: 12px;
    color: #b1b1b1;
    text-decoration-line: line-through;
  }

  .sale-price {
    margin-top: 3px;
    font-size: 15px;
    font-weight: 600;

    > span:first-child {
      color: #ffb564;
      margin-right: 3px;
    }
  }
`;
