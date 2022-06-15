import React, { useState } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as fullHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as Heart } from "@fortawesome/free-regular-svg-icons";
import * as Api from "api";

const GroupPurchaseCard = ({ purchase, setConfirmationIcon }) => {
  const [wish, setWish] = useState(purchase?.toggle === 0 ? false : true);

  const getDeadline = (date) => {
    if (!date) return;

    return `${date.substr(0, 4)}년 ${date.substr(5, 2)}월 ${date.substr(
      8,
      2
    )}일 ${date.substr(11, 2)}시까지`;
  };

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

    await Api.put(`toggle/group/${purchase._id}`);
    setWish((cur) => !cur);
  };

  return (
    <Container wish={wish}>
      <Image url={purchase?.productInfo?.images} />
      <Information>
        <CardTitle>
          <span>
            {purchase.groupType === "local" ? purchase.location : "택배공구"}
          </span>
          <span>{purchase.groupName}</span>
        </CardTitle>
        <Price>
          <span>{purchase?.productInfo?.discountRate}%</span>
          <span>{purchase?.productInfo?.salePrice}원</span>
          <span>{purchase?.productInfo?.price}원</span>
        </Price>
        <Deadline>
          <div>
            <span>{purchase?.remainedPersonnel}개</span>
            <span> 남음</span>
          </div>
          <span>{getDeadline(purchase?.deadline)}</span>
        </Deadline>
      </Information>

      {!wish && <FontAwesomeIcon icon={Heart} onClick={handleToggle} />}
      {wish && <FontAwesomeIcon icon={fullHeart} onClick={handleToggle} />}
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
    color: ${({ wish }) => {
      if (wish) return "#FF6A6A;";
      else return "#9c9c9c;";
    }};
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
