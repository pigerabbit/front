import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as fullHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as Heart } from "@fortawesome/free-regular-svg-icons";
import * as Api from "api";

import useShowComfirmationIcon from "hooks/useShowConfirmationIcon";

const titleLengthInit =
  (window.innerWidth >= 700 && 35) ||
  (window.innerWidth >= 600 && 30) ||
  (window.innerWidth >= 550 && 25) ||
  (window.innerWidth >= 500 && 20) ||
  (window.innerWidth >= 450 && 15) ||
  14;

const BestProductCard = ({ product, index }) => {
  const navigate = useNavigate();
  const [wish, setWish] = useState(product.toggle ? true : false);
  const [titleLength, setTitleLength] = useState(titleLengthInit);

  const showConfirmationIcon = useShowComfirmationIcon();

  const handleToggle = async (e) => {
    e.stopPropagation();

    if (!wish) {
      showConfirmationIcon({
        backgroundColor: "#FF6A6A;",
        color: "white",
        icon: fullHeart,
        text: "찜!",
      });
    } else {
      showConfirmationIcon({
        backgroundColor: "#ABABAB;",
        color: "white",
        icon: fullHeart,
        text: "찜 취소",
      });
    }

    await Api.put(`toggle/product/${product._id}`);
    setWish((cur) => !cur);
  };

  const handleCardClick = () => {
    navigate(`/products/${product.id}`);
  };

  const handleResize = () => {
    if (window.innerWidth >= 700) setTitleLength(35);
    else if (window.innerWidth >= 600) setTitleLength(30);
    else if (window.innerWidth >= 550) setTitleLength(25);
    else if (window.innerWidth >= 500) setTitleLength(20);
    else if (window.innerWidth >= 450) setTitleLength(15);
    else setTitleLength(14);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <Container wish={wish} onClick={handleCardClick}>
      <span>{index + 1}</span>
      <Image url={product.images} />
      <Information>
        <Title>
          <span>[{product.userInfo.business[0].businessName}]</span>
          <span>
            {product.name.slice(0, titleLength)}
            {product.name.length > titleLength && ".."}
          </span>
        </Title>
        <Price>
          <span>{product.price.toLocaleString()}원</span>
          <div className="sale-price">
            <span>{product.discountRate}%</span>
            <span>{product.salePrice.toLocaleString()}원</span>
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
  min-width: 85px;
  height: 85px;
  border-radius: 10px;
  background-image: url(${({ url }) => url});
  background-size: cover;
  background-position: center;
`;

const Information = styled.div`
  cursor: pointer;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  flex-grow: 1;
  min-width: 173px;
  height: 100%;
  padding: 18px 0 18px 14px;
`;

const Title = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 15px;
  > span {
    margin-bottom: 3px;

    &:first-child {
      font-size: 13px;
    }
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
