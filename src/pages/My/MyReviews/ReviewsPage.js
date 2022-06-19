import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import * as Api from 'api';

import MyPageLayout from '../MyPageLayout';
import ReviewCard from './ReviewCard';
import { useSelector } from 'react-redux';

// 3번 취향
const ReviewCardContainer = ({ show, reviews, onDelete }) => {
  if (!show) {
    return null;
  }

  return (
    <article>
      {reviews.map((review) => (
        <ReviewCard
          review={review}
          onDeleteReview={onDelete}
          key={review.postId}
        />
      ))}
    </article>
  );
};

const ReviewsPage = () => {
  const { user } = useSelector((state) => state.user);
  const [reviews, setReviews] = useState([]);

  const isReviewExist = reviews.length > 0;

  const findReview = (id) => {
    const review = reviews.find((review) => review.postId === id);
    return review;
  };

  const hasReview = (id) => {
    return Boolean(findReview(id));
  };

  const handleDeleteReview = (id) => {
    if (!hasReview(id)) {
      return;
    }

    const filteredReviews = reviews.filter(({ postId }) => postId !== id);
    setReviews(filteredReviews);
    // setReviews(reviews => reviews.filter(review => review.postId !== id))
  };

  /**
   * 사용처 (ReviewsPage)
   * 컨트롤러 (controller) => res.data.payload 를 벗겨주는 역할
   * 에러 처리 레이어 (layer) => 에러를 처리할 것
   * 백엔드와 접하는 최전선 (Api.js)
   */
  const getReviews = async () => {
    if (user) {
      try {
        const res = await Api.get(`/posts/${user.id}/review`);
        setReviews(res.data.payload);
      } catch (e) {
        에러처리;
      }
    }
  };

  useEffect(() => {
    getReviews();
  }, [user]);

  // 1번 취향
  // const renderReviews = () => {
  //   if (reviews.length > 0) {
  //     return (
  //       <div>
  //         {reviews.map((review) => (
  //           <ReviewCard
  //             review={review}
  //             deleteReview={deleteReview}
  //             key={review.postId}
  //           />
  //         ))}
  //       </div>
  //     );
  //   }

  //   return (
  //     <NoReviewContainer>
  //       <img
  //         src={`${process.env.PUBLIC_URL}/images/noContent.svg`}
  //         alt='no nearby'
  //       />
  //       작성된 후기가 없습니다.
  //     </NoReviewContainer>
  //   );
  // };

  // 2번 취향
  // if (reviews.length > 0) {
  //   return (
  //     <MyPageLayout pageName={'나의 후기'} previousPage='/mypage'>
  //       <Container>
  //         <TotalNumber>총 {reviews.length}건</TotalNumber>
  //         {
  //           <div>
  //             {reviews.map((review) => (
  //               <ReviewCard
  //                 review={review}
  //                 deleteReview={deleteReview}
  //                 key={review.postId}
  //               />
  //             ))}
  //           </div>
  //         }
  //       </Container>
  //     </MyPageLayout>
  //   );
  // }

  return (
    <MyPageLayout pageName={'나의 후기'} previousPage='/mypage'>
      <Container>
        <TotalNumber>총 {reviews.length}건</TotalNumber>
        <ReviewCardContainer
          show={isReviewExist}
          reviews={reviews}
          onDeleteReview={handleDeleteReview}
        />
        <NoReviewContainer show={isReviewExist}>
          <img
            src={`${process.env.PUBLIC_URL}/images/noContent.svg`}
            alt='no nearby'
          />
          작성된 후기가 없습니다.
        </NoReviewContainer>
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

const NoReviewContainer = styled.div`
  margin-top: 10%;
  display: ${({ show }) => (show ? 'flex' : 'none')};
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
