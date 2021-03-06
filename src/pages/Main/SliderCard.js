import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart as fullHeart,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { faHeart as Heart } from "@fortawesome/free-regular-svg-icons";
import * as Api from "api";

import getDeadline from "utils/getDeadline";
import useShowComfirmationIcon from "hooks/useShowConfirmationIcon";

const SliderCard = ({ group }) => {
  const [wish, setWish] = useState(group?.toggle ? true : false);

  const navigate = useNavigate();
  const showConfirmationIcon = useShowComfirmationIcon();

  const handleCardClick = () => {
    navigate(`/groups/${group.groupId}`);
  };

  const handleToggle = async (event) => {
    event.stopPropagation();

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

  return (
    <Container wish={wish} onClick={handleCardClick}>
      <Image url={group?.productInfo.images} />
      <Information>
        <CardTitle>
          <span>
            {group?.groupType === "local" &&
              "[지역공구] " + group.location.split(")")[0] + ")"}
            {group?.groupType === "coupon" &&
              "[이용권공구] " + group.location.split(")")[0] + ")"}
            {group?.groupType === "normal" && "택배공구"}
          </span>
          <span>{group?.groupName}</span>
        </CardTitle>
        <Price>
          <span>{group?.productInfo.discountRate}%</span>
          <span>{group?.productInfo.salePrice.toLocaleString()}원</span>
          <span>{group?.productInfo.price.toLocaleString()}원</span>
        </Price>
        <Deadline>
          <div>
            <span>{group?.remainedPersonnel}개</span>
            <span> 남음</span>
          </div>
          <span>{getDeadline(group?.deadline)}</span>
        </Deadline>
      </Information>

      {wish && <FontAwesomeIcon icon={fullHeart} onClick={handleToggle} />}
      {!wish && <FontAwesomeIcon icon={Heart} onClick={handleToggle} />}
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
    color: ${({ wish }) => {
      if (wish) return "#FF6A6A;";
      else return "#9c9c9c;";
    }};
  }
`;

const Image = styled.div`
  width: 30vw;
  max-width: 200px;
  height: 30vw;
  max-height: 200px;
  border-radius: 5px;
  background-image: url(${({ url }) => url});
  background-size: cover;
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
