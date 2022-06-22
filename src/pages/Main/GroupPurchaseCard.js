import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as fullHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as Heart } from "@fortawesome/free-regular-svg-icons";
import * as Api from "api";
import { useNavigate } from "react-router-dom";

import getDeadline from "utils/getDeadline";
import useShowComfirmationIcon from "hooks/useShowConfirmationIcon";

const numTitleInit =
  (window.innerWidth >= 700 && 15) ||
  (window.innerWidth >= 550 && 32) ||
  (window.innerWidth >= 450 && 25) ||
  16;

const GroupPurchaseCard = ({ purchase }) => {
  const [wish, setWish] = useState(purchase?.toggle === 0 ? false : true);
  const [numTitle, setNumTitle] = useState(numTitleInit);

  const navigate = useNavigate();
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

    await Api.put(`toggle/group/${purchase._id}`);
    setWish((cur) => !cur);
  };

  const handleCardClick = () => {
    navigate(`/groups/${purchase.groupId}`);
  };

  const handleResize = () => {
    if (window.innerWidth >= 700) setNumTitle(15);
    else if (window.innerWidth >= 550) setNumTitle(32);
    else if (window.innerWidth >= 450) setNumTitle(25);
    else setNumTitle(16);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <Container wish={wish} onClick={handleCardClick}>
      <Image url={purchase?.productInfo?.images} />
      <Information>
        <CardTitle>
          <span>
            {purchase.groupType === "local" ? purchase.location : "택배공구"}
          </span>
          <span>
            {purchase.groupName.slice(0, numTitle)}
            {purchase.groupName.length > numTitle && ".."}
          </span>
        </CardTitle>
        <Price>
          <span>{purchase?.productInfo?.discountRate}%</span>
          <span>{purchase?.productInfo?.salePrice.toLocaleString()}원</span>
          <span>{purchase?.productInfo?.price.toLocaleString()}원</span>
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
  width: 90px;
  min-width: 90px;
  height: 90px;
  border-radius: 5px;
  background-image: url(${({ url }) => url});
  background-size: cover;
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
