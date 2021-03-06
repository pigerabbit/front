import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import * as Api from "api";

import MyPageLayout from "../MyPageLayout";
import InquireCard from "./InquireCard";
import LoadingSpinner from "components/LoadingSpinner";

const options = [
  { eng: "all", kor: "전체보기" },
  { eng: "false", kor: "미답변" },
  { eng: "true", kor: "답변완료" },
];

const InquiresPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [option, setOption] = useState("all");
  const [inquires, setInquires] = useState([]);
  const { user } = useSelector((state) => state.user);

  const getInquires = async () => {
    const params = option === "all" ? {} : { reply: option };

    try {
      const res = await Api.get(`posts/${user?.id}/cs`, "", params);
      setInquires(res.data.payload.postList);
      setIsLoading(false);
    } catch (e) {
      // 에러처리
    }
  };

  const deleteAnInquire = (id) => {
    const index = inquires.findIndex((inquire) => inquire.post.postId === id);
    setInquires((cur) => {
      const copy = [...cur];
      copy.splice(index, 1);
      return copy;
    });
  };

  useEffect(() => {
    if (user) {
      getInquires();
    }
  }, [option, user]);

  return (
    <MyPageLayout pageName={"나의 문의"} previousPage="/mypage">
      {isLoading ? (
        <LoadingContainer>
          <LoadingSpinner />
        </LoadingContainer>
      ) : (
        <Container>
          {inquires.length > 0 && (
            <Info>
              <TotalNumber>총 {inquires.length}건</TotalNumber>
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
          )}

          {inquires.map((inquire) => (
            <InquireCard
              inquire={inquire}
              key={inquire.post.postId}
              deleteAnInquire={deleteAnInquire}
            />
          ))}

          {inquires.length === 0 && (
            <NoReviewContainer>
              <img
                src={`${process.env.PUBLIC_URL}/images/noContent.svg`}
                alt="no nearby"
              />
              작성된 문의가 없습니다.
            </NoReviewContainer>
          )}
        </Container>
      )}
    </MyPageLayout>
  );
};

export default InquiresPage;

const LoadingContainer = styled.div`
  width: 100%;
  height: 80vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

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

const NoReviewContainer = styled.div`
  width: 100%;
  height: 80vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 3vw;
  @media (min-width: 650px) {
    font-size: 20px;
  }

  > img {
    width: 50%;
    margin-bottom: 5%;
  }
`;
