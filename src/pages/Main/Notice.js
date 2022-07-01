import React, { useEffect, useState } from "react";
import styled from "styled-components";
import * as Api from "api";
import { useDispatch } from "react-redux";
import { confirmNotice } from "redux/userSlice";

import SideBar from "components/SideBar";
import NoticeCard from "./NoticeCard";
import LoadingSpinner from "components/LoadingSpinner";

const Notice = ({ user, setIsOpenNotice }) => {
  const [noticeList, setNoticeList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const dispatch = useDispatch();

  const getNoticeList = async () => {
    try {
      setIsLoading(true);

      const res = await Api.get("users", `${user.id}/alert`);
      setNoticeList(res.data.payload || []);
      dispatch(confirmNotice());

      setIsLoading(false);
    } catch (e) {
      // 에러처리
    }
  };

  useEffect(() => {
    getNoticeList();
  }, []);

  if (isLoading) {
    return (
      <SideBar title="알림" setIsOpenSideBar={setIsOpenNotice}>
        <Container noContents={true}>
          <LoadingSpinner />
        </Container>
      </SideBar>
    );
  }

  return (
    <SideBar title="알림" setIsOpenSideBar={setIsOpenNotice}>
      <Container noContents={noticeList.length === 0}>
        {noticeList.length === 0 && (
          <NoContentContainer>
            <img
              src={`${process.env.PUBLIC_URL}/images/noSale.svg`}
              alt="no nearby"
            />
            알림이 없습니다.
          </NoContentContainer>
        )}
        {noticeList.map((notice) => (
          <NoticeCard key={notice._id} notice={notice} />
        ))}
      </Container>
    </SideBar>
  );
};

export default Notice;

const Container = styled.div`
  box-sizing: border-box;
  width: 100%;
  max-width: 770px;
  height: 90vh;
  padding: 3% 5%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: ${({ noContents }) => noContents && "center;"};
  overflow: scroll;

  &::-webkit-scrollbar {
    background-color: none;
    width: 6px;
  }
  &::-webkit-scrollbar-thumb {
    background: #d9d9d9;
    border-radius: 10px;
    opacity: 0.4;
  }
`;

const NoContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 3vw;
  @media (min-width: 650px) {
    font-size: 20px;
  }

  > img {
    width: 50%;
    margin-bottom: 5%;
  }
`;
