import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as fullHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as Heart } from "@fortawesome/free-regular-svg-icons";
import * as Api from "api";

const BestProductCard = ({ product, index, setConfirmationIcon }) => {
  const navigate = useNavigate();
  const [wish, setWish] = useState(product.toggle ? true : false);

  const unShowIcon = () => {
    setTimeout(() => {
      setConfirmationIcon((cur) => {
        return { ...cur, show: false };
      });
    }, 1600);
  };

  const confirmWish = () => {
    setConfirmationIcon({
      show: true,
      backgroundColor: "#FF6A6A;",
      color: "white",
      icon: fullHeart,
      text: "찜!",
    });

    unShowIcon();
  };

  const confirmUnwish = () => {
    setConfirmationIcon({
      show: true,
      backgroundColor: "#ABABAB;",
      color: "white",
      icon: fullHeart,
      text: "찜 취소",
    });

    unShowIcon();
  };

  const handleToggle = async () => {
    if (!wish) {
      confirmWish();
    } else {
      confirmUnwish();
    }

    await Api.put(`toggle/product/${product._id}`);
    setWish((cur) => !cur);
  };

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
          <span>[{product.userInfo.business[0].businessName}]</span>
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
      <span onClick={handleToggle}>
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
