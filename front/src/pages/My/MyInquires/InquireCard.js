import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import ConfirmationPopup from "../ConfirmationPopup";

const InquireCard = ({ inquire }) => {
  const [isOpenPopup, setIsOpenPopup] = useState(false);

  const getDate = (date) => {
    return `${date.slice(0, 4)}.${date.slice(5, 7)}.${date.slice(8, 10)}`;
  };

  return (
    <Container>
      <Content>
        <Badge reply={inquire.reply}>
          {inquire.reply ? "답변완료" : "미답변"}
        </Badge>

        <Title>논산에서 자란 신선한 딸기딸기</Title>
        <Date>{getDate(inquire.createdAt)}</Date>
        <Inquire reply={inquire.reply}>{inquire.content}</Inquire>

        {inquire.reply && (
          <Reply>
            <ReplyTitle>
              <span>답변</span>
              <span>2022.05.05</span>
            </ReplyTitle>
            <ReplyContent>
              안녕하세요. 담당자입니다. 문의 주신 상품의 경우, 최소 5묶음부터
              최대 10묶음까지 구매 가능합니다. 감사합니다.
            </ReplyContent>
            <div>
              ※ 답변 내용은 각 판매사에서 작성되며,
              <br />
              소공소공의 서비스/정책과 상이할 수 있습니다.
            </div>
          </Reply>
        )}
      </Content>

      <DeleteButton
        onClick={() => {
          setIsOpenPopup(true);
        }}
      >
        삭제
      </DeleteButton>

      <ConfirmationPopup
        isOpenPopup={isOpenPopup}
        setIsOpenPopup={setIsOpenPopup}
      >
        <ConfirmationContent>문의를 정말 삭제하시겠습니까?</ConfirmationContent>
      </ConfirmationPopup>
    </Container>
  );
};

export default InquireCard;

const Container = styled.div`
  background-color: white;
  position: relative;
  margin-top: 7px;
  box-shadow: 0 3px 3px -3px #c7c7c7;
  width: 100%;
  display: flex;
  justify-content: center;
`;

const Content = styled.div`
  cursor: pointer;
  z-index: 2;
  background-color: white;
  cursor: pointer;
  position: relative;
  width: 85%;
  max-width: 550px;
  margin: 3.5vw 0;
  @media (min-width: 770px) {
    margin: 28px 0;
  }
`;

const Badge = styled.div`
  border-radius: 5px;
  width: 12%;
  max-width: 50px;
  margin-bottom: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 6px 6px 5px 6px;
  font-weight: 600;
  font-size: 2vw;
  @media (min-width: 620px) {
    font-size: 12px;
  }
  background-color: ${({ reply }) => (reply ? "#FFB564;" : "#E8E8E8;")};
  color: ${({ reply }) => (reply ? "white;" : "#505050;")};
`;

const Title = styled.div`
  margin-bottom: 8px;
  font-size: 3.5vw;
  @media (min-width: 620px) {
    font-size: 22px;
  }
`;

const Date = styled.div`
  margin-bottom: 15px;
  color: #606060;
  font-size: 2.6vw;
  @media (min-width: 620px) {
    font-size: 16px;
  }
`;

const Inquire = styled.div`
  font-size: 2.8vw;
  line-height: 3.8vw;
  margin-bottom: ${({ reply }) => (reply ? "15px;" : "0px;")};
  @media (min-width: 620px) {
    font-size: 17.5px;
    line-height: 24px;
  }
`;

const DeleteButton = styled.div`
  z-index: 2;
  cursor: pointer;
  position: absolute;
  right: 5%;
  top: 12%;
  background-color: #f1f1f1;
  color: #434343;
  border-radius: 20px;
  font-size: 2.2vw;
  padding: 0.6vw 2vw;
  @media (min-width: 620px) {
    font-size: 13.5px;
    padding: 4px 13px;
  }
`;

const ConfirmationContent = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 10vw;
  font-size: 4vw;
  @media (min-width: 600px) {
    margin-top: 60px;
    font-size: 24px;
  }
`;

const Reply = styled.div`
  box-sizing: border-box;
  width: 100%;
  background-color: #fafafa;
  border-width: 1px 0px;
  border-style: solid;
  border-color: #cecece;
  padding: 3%;
  font-size: 2.3vw;
  line-height: 3.5vw;
  @media (min-width: 620px) {
    font-size: 15px;
    line-height: 22px;
  }
`;

const ReplyTitle = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;

  > span:first-child {
    color: #ffb564;
  }
  > span:last-child {
    color: #606060;
  }
`;

const ReplyContent = styled.div`
  margin-bottom: 10px;
`;
