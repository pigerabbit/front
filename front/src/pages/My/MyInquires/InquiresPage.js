import React, { useState } from "react";
import styled from "styled-components";

import MyPageLayout from "../MyPageLayout";
import InquireCard from "./InquireCard";

const mock = [
  {
    postId: "6d497fca-487c-4ed7-9326-ce2e771e6b3d",
    type: "cs",
    authorizedUsers: [
      "41fbbc80-66ea-47f4-9828-5ed6b03ccef8",
      "vd2de8b59-2a46-4eed-b209-0f6834988171",
    ],
    writer: "41fbbc80-66ea-47f4-9828-5ed6b03ccef8",
    receiver: "vd2de8b59-2a46-4eed-b209-0f6834988171",
    content: "최대 얼마나 구매 가능한가요?",
    postImg: null,
    removed: false,
    createdAt: "2022-05-29T12:12:42.219Z",
    reply: false,
  },
  {
    postId: "6d497fca-487c-4ed7-9326-ce2e771e6b3a",
    type: "cs",
    authorizedUsers: [
      "41fbbc80-66ea-47f4-9828-5ed6b03ccef8",
      "vd2de8b59-2a46-4eed-b209-0f6834988171",
    ],
    writer: "41fbbc80-66ea-47f4-9828-5ed6b03ccef8",
    receiver: "vd2de8b59-2a46-4eed-b209-0f6834988171",
    content: "최대 얼마나 구매 가능한가요?",
    postImg: null,
    removed: false,
    createdAt: "2022-05-29T12:12:42.219Z",
    reply: true,
  },
];

const options = [
  { eng: "all", kor: "전체보기" },
  { eng: "false", kor: "미답변" },
  { eng: "true", kor: "답변완료" },
];

const InquiresPage = () => {
  const [option, setOption] = useState("all");

  return (
    <MyPageLayout pageName={"나의 문의"}>
      <Container>
        <Info>
          <TotalNumber>총 3건</TotalNumber>
          <SelectBox>
            {options.map(({ eng, kor }) => (
              <Option
                key={eng}
                selected={option === eng}
                onClick={() => {
                  setOption(eng);
                }}
              >
                {kor}
              </Option>
            ))}
          </SelectBox>
        </Info>

        {mock.map((inquire) => (
          <InquireCard inquire={inquire} key={inquire.postId} />
        ))}
      </Container>
    </MyPageLayout>
  );
};

export default InquiresPage;

const Container = styled.div`
  padding-bottom: 80px;
  @media (max-width: 440px) {
    padding-bottom: 70px;
  }
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Info = styled.div`
  margin-top: 15px;
  margin-bottom: 5px;
  position: relative;
  width: 85%;
  @media (min-width: 640px) {
    width: 545px;
  }
  box-sizing: border-box;
  display: flex;
  align-items: center;
`;

const TotalNumber = styled.div`
  max-width: 550px;
  font-size: 2.5vw;
  @media (min-width: 620px) {
    font-size: 16px;
  }
`;

const SelectBox = styled.div`
  margin-left: 15px;
  display: flex;
`;

const Option = styled.div`
  cursor: pointer;
  height: 40%;
  padding: 6px 10px;
  margin: 0 2px;
  border-radius: 20px;
  transition: box-shadow 0.4s;
  ${({ selected }) => {
    if (selected) return "box-shadow: 0 0 6px #636363;";
  }}
  font-size: 2vw;
  @media (min-width: 640px) {
    font-size: 13px;
  }
`;
