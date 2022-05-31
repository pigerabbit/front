import React from "react";
import styled from "styled-components";

import MyPageLayout from "../MyPageLayout";
import ReviewCard from "./ReviewCard";

const mock = [
  {
    postId: "d174a67e-b809-4060-844b-ae3276757166",
    type: "review",
    authorizedUsers: [],
    writer: "41fbbc80-66ea-47f4-9828-5ed6b03ccef8",
    receiver: "db24f936-42b6-44e3-a134-1e02bcbf7f6e",
    content:
      "딸기가 아주 신선했어요. 배송도 빨라서 좋았습니다. 다음에 또 구매할 의사 있어요. 딸기가 아주 신선했어요. 배송도 빨라서 좋았습니다. 다음에 또 구매할 의사 있어요.",
    postImg: null,
    removed: false,
    createdAt: "2022-05-30T15:24:33.518Z",
  },
  {
    postId: "d174a67e-b809-4060-844b-ae327675716a",
    type: "review",
    authorizedUsers: [],
    writer: "41fbbc80-66ea-47f4-9828-5ed6b03ccef8",
    receiver: "db24f936-42b6-44e3-a134-1e02bcbf7f6e",
    content: "배송이 늦어 아쉽습니다. 딸기 상태는 좋아요~",
    postImg: null,
    removed: false,
    createdAt: "2022-05-20T15:24:33.518Z",
  },
  {
    postId: "d174a67e-b809-4060-844b-ae327675716b",
    type: "review",
    authorizedUsers: [],
    writer: "41fbbc80-66ea-47f4-9828-5ed6b03ccef8",
    receiver: "db24f936-42b6-44e3-a134-1e02bcbf7f6e",
    content: "만족스러워요~ 많이파세요~",
    postImg: null,
    removed: false,
    createdAt: "2022-05-31T15:24:33.518Z",
  },
];

const ReviewsPage = () => {
  return (
    <MyPageLayout pageName={"나의 후기"}>
      <Container>
        <TotalNumber>총 3건</TotalNumber>

        {mock.map((review) => (
          <ReviewCard review={review} />
        ))}
      </Container>
    </MyPageLayout>
  );
};

export default ReviewsPage;

const Container = styled.div`
  padding-bottom: 80px;
  @media (max-width: 440px) {
    padding-bottom: 70px;
  }
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const TotalNumber = styled.div`
  width: 90%;
  max-width: 550px;
  margin-top: 15px;
  margin-bottom: 5px;
  font-size: 2.5vw;
  @media (min-width: 620px) {
    font-size: 16px;
  }
`;
