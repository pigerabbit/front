import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStore,
  faCommentDots,
  faComments,
  faHeart,
  faFileLines,
} from "@fortawesome/free-solid-svg-icons";

const MyButtons = () => {
  const { user } = useSelector((state) => state.user);

  const navigate = useNavigate();

  const buttons = [
    { text: "나의 후기", icon: faCommentDots, url: "/mypage/reviews" },
    { text: "나의 문의", icon: faComments, url: "/mypage/inquires" },
    { text: "찜 목록", icon: faHeart, url: "/wishlist" },
    { text: "공구내역", icon: faFileLines, url: "/purchaselist" },
    {
      text: user?.seller ? "나의 판매" : "사업자 인증하기",
      icon: faStore,
      url: user?.seller ? `/markets/${user.id}` : "/businessauth",
    },
  ];

  return (
    <>
      <Buttons>
        {buttons.map(({ text, icon, url }, idx) => (
          <Button
            key={text}
            areaName={idx}
            onClick={() => {
              navigate(url);
            }}
          >
            <FontAwesomeIcon icon={icon} />
            <span>{text}</span>
          </Button>
        ))}
      </Buttons>
      {!user?.seller && (
        <span>사업자임을 인증하면 상품을 판매할 수 있습니다.</span>
      )}
    </>
  );
};

export default MyButtons;

const Buttons = styled.div`
  width: 100%;
  max-width: 450px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-areas: "reviews inquires" "whish purchaseList" "market market";
  grid-gap: 15px;
`;

const Button = styled.div`
  cursor: pointer;
  width: 100%;
  height: 13vw;
  max-height: 55px;
  background-color: #fafafa;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  ${({ areaName }) => {
    if (areaName === 0) return "grid-area: reviews;";
    if (areaName === 1) return "grid-area: inquires;";
    if (areaName === 2) return "grid-area: whish;";
    if (areaName === 3) return "grid-area: purchaseList;";
    if (areaName === 4) return "grid-area: market;";
  }}
  font-size: 3.5vw;
  @media (min-width: 500px) {
    font-size: 18px;
  }

  > svg {
    color: #ffb564;
    margin-right: 10px;
  }
`;
