import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as fullHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as Heart } from "@fortawesome/free-regular-svg-icons";
import * as Api from "api";

const GroupPurchaseCard = ({ purchase }) => {
  const [product, setProduct] = useState({});

  const getDeadline = (date) => {
    return `${date.substr(0, 4)}년 ${date.substr(5, 2)}월 ${date.substr(
      8,
      2
    )}일 ${date.substr(11, 2)}시까지`;
  };

  const getProductData = async () => {
    const res = await Api.get("products", purchase.productId);
    setProduct(res.data.payload.resultProduct);
  };

  useEffect(() => {
    getProductData();
  }, []);

  return (
    <Container>
      <Image url={product?.images} />
      <Information>
        <CardTitle>
          <span>
            {purchase.groupType === "local" ? purchase.location : "택배공구"}
          </span>
          <span>{purchase.groupName}</span>
        </CardTitle>
        <Price>
          <span>{product?.discountRate}%</span>
          <span>{product?.salePrice}원</span>
          <span>{product?.price}원</span>
        </Price>
        <Deadline>
          <div>
            <span>{purchase.remainedPersonnel}개</span>
            <span> 남음</span>
          </div>
          <span>{getDeadline(purchase.deadline)}</span>
        </Deadline>
      </Information>
      <FontAwesomeIcon icon={Heart} size="1x" />
    </Container>
  );
};

export default GroupPurchaseCard;

const Container = styled.div`
  cursor: pointer;
  position: relative;
  width: 100%;
  display: flex;

  > svg {
    position: absolute;
    right: 0;
    bottom: 0;
  }
`;

const Image = styled.div`
  width: 85px;
  height: 85px;
  border-radius: 5px;
  background-image: url(${({ url }) => url});
  background-size: 100%;
  background-position: center;
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
    font-size: 12px;
    font-weight: 600;
    margin-bottom: 2px;
  }

  > span:last-child {
    font-size: 14px;
  }
`;

const Price = styled.div`
  font-size: 12px;
  font-weight: 600;

  > span:first-child {
    color: #ffb564;
    margin-right: 3px;
  }

  > span:last-child {
    font-size: 11.4px;
    color: #b1b1b1;
    text-decoration-line: line-through;
    margin-left: 5px;
  }
`;

const Deadline = styled.div`
  font-size: 12px;
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
