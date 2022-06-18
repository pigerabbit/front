import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as fullHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as Heart } from "@fortawesome/free-regular-svg-icons";
import * as Api from "api";

import useShowComfirmationIcon from "hooks/useShowConfirmationIcon";

const ProductCard = ({ product }) => {
  const [wish, setWish] = useState(product.toggle ? true : false);

  const navigate = useNavigate();
  const showConfirmWish = useShowComfirmationIcon({
    backgroundColor: "#FF6A6A;",
    color: "white",
    icon: fullHeart,
    text: "찜!",
  });
  const showConfirmUnwish = useShowComfirmationIcon({
    backgroundColor: "#ABABAB;",
    color: "white",
    icon: fullHeart,
    text: "찜 취소",
  });

  const handleToggle = async () => {
    if (!wish) {
      showConfirmWish();
    } else {
      showConfirmUnwish();
    }

    await Api.put(`toggle/product/${product._id}`);
    setWish((cur) => !cur);
  };

  return (
    <Container wish={wish}>
      <Image
        className="image"
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
          <span>[{product?.userInfo?.business[0].businessName}]</span>
          <span>
            {product.name.slice(0, 28)}
            {product.name.length > 28 && ".."}
          </span>
        </Title>

        <Price>
          <span>{product.price.toLocaleString()}원</span>
          <div className="salePrice">
            <span>{product?.discountRate}%</span>
            <span>{product.salePrice.toLocaleString()}원</span>
          </div>
        </Price>
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

const Image = styled.div`
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
`;

const Information = styled.div`
  margin-top: 10px;
`;

const Title = styled.div`
  margin-bottom: 10px;
  line-height: 3.5vw;
  font-size: 3vw;

  display: flex;
  flex-direction: column;
  > span {
    margin-bottom: 3px;
  }

  @media (min-width: 600px) {
    line-height: 2.5vw;
    font-size: 2vw;
  }

  @media (min-width: 770px) {
    line-height: 20px;
    font-size: 16px;
  }
`;

const Price = styled.div`
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

  @media (min-width: 600px) {
    font-size: 1.8vw;
    .salePrice {
      font-size: 2vw;
    }
  }

  @media (min-width: 770px) {
    font-size: 14px;
    .salePrice {
      font-size: 16px;
    }
  }
`;
