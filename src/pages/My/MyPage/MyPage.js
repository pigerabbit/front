import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "redux/userSlice";
import styled from "styled-components";
import * as Api from "api";

import MyPageLayout from "../MyPageLayout";
import MyButtons from "./MyButtons";
import InfoEditForm from "./InfoEditForm";
import ConfirmationPopup from "../ConfirmationPopup";
import ConfirmationIcon from "components/ConfirmationIcon";

const MyPage = () => {
  const [isOpenPopup, setIsOpenPopup] = useState(false);
  const [password, setPassword] = useState("");
  const [placeholder, setPlaceholder] = useState("비밀번호를 입력해주세요.");
  const [InputBorderColor, setInputBorderColor] = useState("#e6e6e6");
  const { user } = useSelector((state) => state.user);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleUnregister = async () => {
    if (!password) return setInputBorderColor("#FFB564");

    try {
      await Api.delete("users", user.id, { password });
      navigate("/login");
      dispatch(logout());
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
    <MyPageLayout pageName={"my동구"} previousPage="none">
      <ConfirmationIcon />

      <Section>
        <Profile>
          <ProfileImg url={user?.imageLink}></ProfileImg>
          <div className="name">
            {user?.seller && `${user?.business[0].businessName}, `}
            {user?.name}
          </div>
          <div className="email">{user?.email}</div>
        </Profile>
      </Section>

      <Section>
        <MyButtons />
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

const ProfileImg = styled.div`
  background-image: url(${({ url }) => url});
  background-size: cover;
  background-position: center;
  width: 18vw;
  max-width: 140px;
  height: 18vw;
  max-height: 140px;
  border-radius: 50%;
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
