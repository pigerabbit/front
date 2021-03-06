import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart as fullHeart,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { faHeart as Heart } from "@fortawesome/free-regular-svg-icons";
import * as Api from "api";
import { useNavigate } from "react-router-dom";

import getDeadline from "utils/getDeadline";
import useShowComfirmationIcon from "hooks/useShowConfirmationIcon";

const titleLengthInit =
  (window.innerWidth >= 700 && 35) ||
  (window.innerWidth >= 600 && 30) ||
  (window.innerWidth >= 550 && 25) ||
  (window.innerWidth >= 500 && 20) ||
  (window.innerWidth >= 450 && 15) ||
  14;

const GroupPurchaseCard = ({ group }) => {
  const [wish, setWish] = useState(group?.toggle === 0 ? false : true);
  const [titleLength, setTitleLength] = useState(titleLengthInit);

  const navigate = useNavigate();
  const showConfirmationIcon = useShowComfirmationIcon();

  const handleToggle = async (e) => {
    e.stopPropagation();

    try {
      await Api.put(`toggle/group/${group._id}`);

      showConfirmationIcon({
        backgroundColor: wish ? "#ABABAB;" : "#FF6A6A;",
        color: "white",
        icon: fullHeart,
        text: wish ? "찜 취소" : "찜!",
      });

      setWish((cur) => !cur);
    } catch (error) {
      showConfirmationIcon({
        backgroundColor: "#ABABAB;",
        color: "white",
        icon: faXmark,
        text: "찜 실패",
      });
    }
  };

  const handleCardClick = () => {
    navigate(`/groups/${group.groupId}`);
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
      <Image url={group?.productInfo?.images} />
      <Information>
        <CardTitle>
          <span>
            {group?.groupType === "local" &&
              "[지역공구] " + group.location.split(")")[0] + ")"}
            {group?.groupType === "coupon" &&
              "[이용권공구] " + group.location.split(")")[0] + ")"}
            {group?.groupType === "normal" && "택배공구"}
          </span>
          <span>
            {group.groupName.slice(0, titleLength)}
            {group.groupName.length > titleLength && ".."}
          </span>
        </CardTitle>
        <Price>
          <span>{group?.productInfo?.discountRate}%</span>
          <span>{group?.productInfo?.salePrice.toLocaleString()}원</span>
          <span>{group?.productInfo?.price.toLocaleString()}원</span>
        </Price>
        <Deadline>
          <div>
            <span>{group?.remainedPersonnel}개</span>
            <span> 남음</span>
          </div>
          <span>{getDeadline(group?.deadline)}</span>
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
  box-sizing: border-box;
  width: 100%;
  padding: 5px;
  display: flex;
  border-radius: 5px;

  &:active {
    background-color: #f7f7f7;
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
