import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "redux/userSlice";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStore,
  faCommentDots,
  faComments,
  faHeart,
  faFileLines,
} from "@fortawesome/free-solid-svg-icons";
import * as Api from "api";

import MyPageLayout from "../MyPageLayout";
import InfoEditForm from "./InfoEditForm";
import ConfirmationPopup from "../ConfirmationPopup";

const MyPage = () => {
  const [isOpenPopup, setIsOpenPopup] = useState(false);
  const [password, setPassword] = useState("");
  const [placeholder, setPlaceholder] = useState("비밀번호를 입력해주세요.");
  const [InputBorderColor, setInputBorderColor] = useState("#e6e6e6");
  const { user } = useSelector((state) => state.user);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const buttons = [
    { text: "나의 후기", icon: faCommentDots, url: "/mypage/reviews" },
    { text: "나의 문의", icon: faComments, url: "/mypage/inquires" },
    { text: "찜 목록", icon: faHeart, url: "/whishlist" },
    { text: "공구내역", icon: faFileLines, url: "/purchaselist" },
    {
      text: user.seller ? "나의 판매" : "사업자 인증하기",
      icon: faStore,
      url: user.seller ? "/markets/:id" : "/businessauth",
    },
  ];

  const handleUnregister = async () => {
    if (!password) return setInputBorderColor("#FFB564");

    try {
      dispatch(logout());
      navigate("/login");
      await Api.delete("users", user.id, { password });
      sessionStorage.removeItem("userToken");
    } catch (e) {
      setPassword("");
      setPlaceholder(e.response.data);
      setInputBorderColor("#FFB564");
    }
  };

  useEffect(() => {
    setInputBorderColor("#e6e6e6");
  }, [password]);

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
        {!user.seller && (
          <span>사업자임을 인증하면 상품을 판매할 수 있습니다.</span>
        )}
      </Section>

      <Section>
        <InfoEditForm setIsOpenPopup={setIsOpenPopup} />
      </Section>

      <ConfirmationPopup
        isOpenPopup={isOpenPopup}
        setIsOpenPopup={setIsOpenPopup}
        buttonContent="회원탈퇴"
        handleButtonClick={handleUnregister}
      >
        <ConfirmationContent>
          정말 회원탈퇴 하시겠습니까?
          <form>
            <Input
              InputBorderColor={InputBorderColor}
              type="password"
              value={password}
              placeholder={placeholder}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              autoComplete="off"
            />
          </form>
        </ConfirmationContent>
      </ConfirmationPopup>
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
  flex-direction: column;
  align-items: center;

  > span {
    z-index: 3;
    margin-top: 10px;
    color: #ababab;
    font-size: 2.5vw;
    @media (min-width: 500px) {
      font-size: 13px;
    }
  }
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

const ConfirmationContent = styled.div`
  width: 60%;
  margin-left: 20%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 8vw;
  font-size: 4vw;
  @media (min-width: 600px) {
    margin-top: 50px;
    font-size: 24px;
  }

  > form {
    width: 80%;
  }
`;

const Input = styled.input`
  box-sizing: border-box;
  margin-top: 10px;
  width 100%;
  height: 30px;
  @media (max-width: 400px) {
    margin-top: 5px;
    height: 20px;
  }
  background-color: #fbfbfb;
  border: 1px solid ${({ InputBorderColor }) => InputBorderColor};
  text-align: center;

  &:focus {
    outline: none;
  }
`;
