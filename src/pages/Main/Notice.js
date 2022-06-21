import React, { useEffect, useState } from "react";
import styled from "styled-components";
import * as Api from "api";
import { useSelector } from "react-redux";

const from = {
  product: "상품 삭제",
  cs: "상품 문의",
  review: "상품 후기",
  group: "공구 알림",
  groupChat: "댓글 알림",
  comment: "댓글 알림",
};

const Notice = () => {
  const { user } = useSelector((state) => state.user);
  const [noticeList, setNoticeList] = useState([]);

  const getNoticeList = async () => {
    const res = await Api.get("users", `${user.id}/alert`);
    setNoticeList(res.data.payload);
  };

  useEffect(() => {
    getNoticeList();
  }, []);
  return (
    <Container>
      {noticeList.map((notice) => (
        <NoticeCard key={notice._id}>
          <Image
            url={
              "https://images.unsplash.com/photo-1630431341973-02e1b662ec35?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=60&raw_url=true&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTR8fHBvdGF0b3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500"
            }
          />
          <Text>
            <span>
              [{from[notice.from]}] {}
            </span>
            <span>{notice.content}</span>
          </Text>
        </NoticeCard>
      ))}
    </Container>
  );
};

export default Notice;

const Container = styled.div`
  width: 90%;
  margin: 3% 5%;
  display: flex;
  flex-direction: column;
  align-items: center;
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
  background-size: 100%;
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
