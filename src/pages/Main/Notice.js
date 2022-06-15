import React from "react";
import styled from "styled-components";

const NoticeList = [
  {
    groupType: "normal",
    title: "싱싱한 왕딸기 공구해요!",
    content: "결제가 완료되었습니다. 배송이 곧 시작됩니다.",
    image:
      "https://images.unsplash.com/photo-1630431341973-02e1b662ec35?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=60&raw_url=true&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTR8fHBvdGF0b3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500",
  },
  {
    groupType: "local",
    title: "딸기 케이크 공구",
    content: "기간이 마감되어 공동구매가 취소되었습니다.",
    image:
      "https://images.unsplash.com/photo-1630431341973-02e1b662ec35?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=60&raw_url=true&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTR8fHBvdGF0b3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500",
  },
  {
    groupType: "local",
    title: "샐러드 공구합니다.",
    content: "판매자의 판매 중단으로 공동구매가 취소되었습니다.",
    image:
      "https://images.unsplash.com/photo-1630431341973-02e1b662ec35?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=60&raw_url=true&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTR8fHBvdGF0b3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500",
  },
  {
    groupType: "normal",
    title: "맛있는 감자감자",
    content: "공동구매 개최자의 중단으로 공동구매가 취소되었습니다.",
    image:
      "https://images.unsplash.com/photo-1630431341973-02e1b662ec35?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=60&raw_url=true&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTR8fHBvdGF0b3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500",
  },
];

const Notice = () => {
  return (
    <Container>
      {NoticeList.map(({ groupType, title, content, image }, idx) => (
        <NoticeCard key={idx}>
          <Image url={image} />
          <Text>
            <span>
              [{groupType === "local" ? "지역공구" : "택배공구"}] {title}
            </span>
            <span>{content}</span>
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
  margin-right: 10px;
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
