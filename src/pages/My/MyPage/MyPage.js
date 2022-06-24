import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "redux/userSlice";
import { init as groupsInit } from "redux/groupsSlice";
import { init as productsInit } from "redux/productsSlice";
import styled from "styled-components";
import { faCheck, faXmark } from "@fortawesome/free-solid-svg-icons";
import * as Api from "api";

import MyPageLayout from "../MyPageLayout";
import MyButtons from "./MyButtons";
import InfoEditForm from "./InfoEditForm";
import ConfirmationPopup from "../ConfirmationPopup";
import useShowComfirmationIcon from "hooks/useShowConfirmationIcon";

const MyPage = () => {
  const [isOpenPopup, setIsOpenPopup] = useState(false);
  const [password, setPassword] = useState("");
  const [placeholder, setPlaceholder] = useState("비밀번호를 입력해주세요.");
  const [InputBorderColor, setInputBorderColor] = useState("#e6e6e6");
  const { user } = useSelector((state) => state.user);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const showConfirmationIcon = useShowComfirmationIcon();
  const profileImgRef = useRef(null);

  const handlePasswordInputChange = (e) => {
    setPassword(e.target.value);
  };

  const handleProfileImageChange = async (e) => {
    const img = e.target.files[0];

    const imageFormData = new FormData();
    imageFormData.append("userImg", img);

    try {
      const res = await Api.putImg(
        `users/${user.id}/profileImage`,
        imageFormData
      );

      showConfirmationIcon({
        backgroundColor: "#70BD86;",
        color: "white",
        icon: faCheck,
        text: "완료!",
      });
    } catch (error) {
      profileImgRef.current.value = null;
      showConfirmationIcon({
        backgroundColor: "#FF6A6A;",
        color: "white",
        icon: faXmark,
        text: "실패",
      });
    }
  };

  const handleUnregister = async () => {
    if (!password) return setInputBorderColor("#FFB564");

    try {
      await Api.delete("users", user.id, { password });
      sessionStorage.removeItem("userToken");
      dispatch(logout());
      dispatch(groupsInit());
      dispatch(productsInit());
      navigate("/login");
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
      <Section>
        <Profile>
          <ProfileImg url={user?.imageLink}>
            <ProfileEditButton htmlFor="profile">편집</ProfileEditButton>
            <ProfileInput
              id="profile"
              type="file"
              accept="image/*"
              onChange={handleProfileImageChange}
              ref={profileImgRef}
            />
          </ProfileImg>
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
              onChange={handlePasswordInputChange}
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
  display: flex;
  justify-content: center;
  align-items: flex-end;
  border-radius: 50%;
`;

const ProfileEditButton = styled.label`
  cursor: pointer;
  width: 40%;
  padding: 5% 0;
  margin-bottom: 3%;
  background-color: #000000;
  opacity: 0.7;
  border-radius: 20px;
  text-align: center;
  color: white;
  font-size: 2vw;
  @media (min-width: 770px) {
    font-size: 15px;
  }
`;

const ProfileInput = styled.input``;

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
