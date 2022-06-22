import React, { useEffect, useState } from "react";
import styled from "styled-components";
import * as Api from "api";
import { useDispatch, useSelector } from "react-redux";
import { confirmNotice } from "redux/userSlice";

import SideBar from "components/SideBar";

const from = {
  product: "상품 삭제",
  cs: "상품 문의",
  review: "상품 후기",
  group: "공구 알림",
  groupChat: "댓글 알림",
  comment: "댓글 알림",
};

const Notice = ({ setIsOpenNotice }) => {
  const { user } = useSelector((state) => state.user);
  const [noticeList, setNoticeList] = useState([]);

  const dispatch = useDispatch();

  const getNoticeList = async () => {
    try {
      const res = await Api.get("users", `${user.id}/alert`);
      setNoticeList(res.data.payload || []);
      dispatch(confirmNotice());
    } catch (e) {
      // 에러처리
    }
  };

  useEffect(() => {
    getNoticeList();
  }, []);
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
          <NoticeCard key={notice._id}>
            <Image url={notice.image} />
            <Text>
              <span>
                [{from[notice.from]}] {}
              </span>
              <span>{notice.content}</span>
            </Text>
          </NoticeCard>
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
`;

const NoticeCard = styled.div`
  box-shadow: 0 2px 3px #d9d9d9;
  background-color: white;
  box-sizing: border-box;
  padding: 10px;
  width: 100%;
  max-width: 450px;
  height: 110px;
  margin-bottom: 10px;
  border-radius: 5px;
  display: flex;
  align-items: center;
`;

const Image = styled.div`
  width: 75px;
  min-width:75px
  height: 75px;
  min-height:75px;
  margin-right: 15px;
  border-radius: 50%;
  background-image: url(${({ url }) => url});
  background-size: cover;
  background-position: center;
`;

const Text = styled.div`
  display: flex;
  flex-direction: column;
  width: 60vw;
  max-width: 315px;
  height: 80%;

  > span:first-child {
    font-size: 13px;
    margin-bottom: 10px;
  }

  > span:last-child {
    font-size: 14px;
    line-height: 20px;
    color: #ff9b2f;
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
