import React, { useEffect } from "react";
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

import MyPageLayout from "../MyPageLayout";
import InfoEditForm from "./InfoEditForm";

const buttons = [
  { text: "나의 판매", icon: faStore, url: "/markets/:id" },
  { text: "나의 후기", icon: faCommentDots, url: "/mypage/reviews" },
  { text: "나의 문의", icon: faComments, url: "/mypage/inquires" },
  { text: "찜 목록", icon: faHeart, url: "/whishlist" },
  { text: "공구내역", icon: faFileLines, url: "/purchaselist" },
];

const MyPage = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);

  return (
    <MyPageLayout pageName={"my소공"}>
      <Section>
        <Profile>
          <div className="img"></div>
          <div className="name">{user?.name}</div>
          <div className="email">{user?.email}</div>
        </Profile>
      </Section>

      <Section>
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
      </Section>

      <Section>
        <InfoEditForm />
      </Section>
    </MyPageLayout>
  );
};

export default MyPage;

const Section = styled.div`
  box-sizing: border-box;
  margin-top: 5px;
  background-color: white;
  width: 100%;
  padding: 30px;
  box-shadow: 0 3px 3px -3px #c7c7c7;
  display: flex;
  justify-content: center;
`;

const Profile = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  .img {
    background-color: #ededed;
    width: 18vw;
    max-width: 140px;
    height: 18vw;
    max-height: 140px;
    border-radius: 50%;
  }

  .name {
    margin: 2.8vw 0;
    @media (min-width: 770px) {
      margin: 22px;
    }
    font-size: 4vw;
    @media (min-width: 580px) {
      font-size: 24px;
    }
  }

  .email {
    color: #a5a5a5;
    font-size: 3vw;
    @media (min-width: 580px) {
      font-size: 18px;
    }
  }
`;

const Buttons = styled.div`
  width: 100%;
  max-width: 450px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-areas: "market market" "reviews inquires" "whish purchaseList";
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
    if (areaName === 0) return "grid-area: market;";
    if (areaName === 1) return "grid-area: reviews;";
    if (areaName === 2) return "grid-area: inquires;";
    if (areaName === 3) return "grid-area: whish;";
    if (areaName === 4) return "grid-area: purchaseList;";
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
