import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as fullHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as Heart } from "@fortawesome/free-regular-svg-icons";
import * as Api from "api";

const ProductCard = ({ product, setConfirmationIcon }) => {
  const [wish, setWish] = useState(product.toggle ? true : false);

  const navigate = useNavigate();

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
    <Container url={product.images} wish={wish}>
      <div
        className="image"
        onClick={() => {
          navigate(`/products/${product.id}`);
        }}
      />

      <Information
        onClick={() => {
          navigate(`/products/${product.id}`);
        }}
      >
        <div className="title">
          [{product?.userInfo?.business[0].businessName}] {product.name}
        </div>

        <div className="price">
          <span>{product.price.toLocaleString()}원</span>
          <div className="salePrice">
            <span>{product?.discountRate}%</span>
            <span>{product.salePrice.toLocaleString()}원</span>
          </div>
        </div>
      </Information>

      {wish && <FontAwesomeIcon icon={fullHeart} onClick={handleToggle} />}
      {!wish && <FontAwesomeIcon icon={Heart} onClick={handleToggle} />}
    </Container>
  );
};

export default ProductCard;

const Container = styled.div`
  padding: 8px;
  cursor: pointer;
  position: relative;
  border-radius: 5px;

  .image {
    width: 100%;
    height: 42vw;
    @media (min-width: 600px) {
      height: 28vw;
    }
    @media (min-width: 770px) {
      height: 215px;
    }
    border-radius: 5px;
    background-image: url(${({ url }) => url});
    background-size: 100%;
    background-position: center;
    transition: all 0.4s;
  }

  &:hover .image {
    box-shadow: 0 0 8px #b7b7b7;
    background-size: 103%;
  }

  > svg {
    position: absolute;
    right: 5px;
    bottom: 5px;
    color: ${({ wish }) => {
      if (wish) return "#FF6A6A;";
      else return "#9c9c9c;";
    }};
  }
`;

const Information = styled.div`
  margin-top: 10px;

  .title {
    margin-bottom: 10px;
    line-height: 3.5vw;
    font-size: 3vw;
  }

  .price {
    font-size: 2.8vw;

    > span {
      color: #9b9b9b;
      text-decoration-line: line-through;
    }

    .salePrice {
      margin-top: 5px;
      font-weight: 600;
      font-size: 3vw;
      > span:first-child {
        color: #ff9b2f;
        margin-right: 5px;
      }
    }
  }

  @media (min-width: 600px) {
    .title {
      line-height: 2.5vw;
      font-size: 2vw;
    }
    .price {
      font-size: 1.8vw;
      .salePrice {
        font-size: 2vw;
      }
    }
  }

  @media (min-width: 770px) {
    .title {
      line-height: 20px;
      font-size: 16px;
    }
    .price {
      font-size: 14px;
      .salePrice {
        font-size: 16px;
      }
    }
  }
`;
