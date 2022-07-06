import React, { useState } from "react";
import styled from "styled-components";
import * as Api from "api";

import encodeFileToBase64 from "utils/encodeFileToBase64";

const ProductReviewForm = ({
  productId,
  setIsWriting,
  setReviews,
  setMyReviews,
  targetGroupId,
  setWritable,
}) => {
  const [reviewTitle, setReviewTitle] = useState("");
  const [reviewText, setReviewText] = useState("");
  const [reviewImg, setReviewImg] = useState({});
  const [previewImg, setPreviewImg] = useState("");
  const [isClicked, setIsClicked] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsClicked(true);

    try {
      const res = await Api.post("posts", {
        type: "review",
        receiver: productId,
        title: reviewTitle,
        content: reviewText,
        groupId: targetGroupId,
      });
      let newReview = res.data.payload;

      if (previewImg) {
        try {
          const formData = new FormData();
          formData.append("postImg", reviewImg);

          const resImg = await Api.postImg(
            `posts/${newReview.postId}/img`,
            formData
          );
          setReviews((cur) => [resImg.data.payload.post, ...cur]);
          setMyReviews((cur) => [resImg.data.payload.post, ...cur]);
        } catch (e) {
          console.log("이미지 업로드 실패");
        }
      } else {
        setReviews((cur) => [newReview, ...cur]);
        setMyReviews((cur) => [newReview, ...cur]);
      }

      setIsWriting(false);
      setWritable(false);
    } catch (e) {
      console.log("review post 실패");
    }
  };

  const loadFile = (e) => {
    const img = e.target.files[0];
    const formData = new FormData();
    formData.append("file", img);
    setReviewImg(img);
    encodeFileToBase64(img, setPreviewImg);
  };

  return (
    <Container>
      <form onSubmit={handleSubmit}>
        <Title>후기 쓰기</Title>
        <ReviewContainer>
          <input
            type="text"
            id="reviewTitle"
            placeholder="제목을 입력해주세요."
            name="reviewTitle"
            value={reviewTitle}
            onChange={(e) => setReviewTitle(e.target.value)}
            maxlength="100"
            required
          />
          <textarea
            id="reviewText"
            placeholder="후기 내용을 작성해주세요."
            name="reviewText"
            rows="6"
            onChange={(e) => setReviewText(e.target.value)}
            minlength="10"
            maxlength="5000"
            required
          />
          <div id="reviewImage">
            <label htmlFor="chooseFile" id="buttonForFile">
              사진 첨부하기
            </label>
            <input
              type="file"
              name="file"
              id="chooseFile"
              accept="image/*"
              onChange={loadFile}
            />
          </div>
          <div id="alternateImg">
            {previewImg ? (
              <PreviewImg src={previewImg} alt="preview-img" />
            ) : (
              "이미지 미리보기"
            )}
          </div>
        </ReviewContainer>
        <ButtonContainer>
          <Button
            id="cancel"
            onClick={() => {
              setIsWriting((cur) => !cur);
            }}
          >
            취소
          </Button>
          <Button type="submit" id="submit" disabled={isClicked}>
            확인
          </Button>
        </ButtonContainer>
      </form>
    </Container>
  );
};

export default ProductReviewForm;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 95%;
  margin: 2px auto;
  min-height: 350px;
  background-color: #ffffff;

  form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    font-size: 15px;
    width: 70%;
  }
`;

const Title = styled.label`
  border-bottom: 3px solid #d0d0d0;
  padding: 10px 0 10px 0;
  margin: 10px 0 10px 0;
  text-align: center;
  font-weight: bold;
  font-size: 18px;
  color: #636363;
`;

const ReviewContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  #reviewTitle {
    width: 90%;
    margin: 5px 0;
    background-color: #f8f8fb;
    border: 1px solid #d0d0d0;
    padding: 10px;
  }

  #reviewText {
    overflow: auto;
    outline: none;

    -webkit-box-shadow: none;
    -moz-box-shadow: none;
    box-shadow: none;

    resize: none;

    word-spacing: 0;

    width: 90%;
    margin: 5px 0;
    background-color: #f8f8fb;
    border: 1px solid #d0d0d0;
    padding: 10px;
  }

  #reviewImage {
    width: 100%;
  }

  #chooseFile {
    display: none;
  }

  #buttonForFile {
    width: 94%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 5px auto;
    height: 35px;
    padding: 5px auto;
    border: 2px dotted #d0d0d0;
    font-size: 13px;
    font-weight: bold;
    color: #636363;
  }

  #alternateImg {
    width: 93%;
    height: 100px;
    border: 1px dotted #d0d0d0;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    color: #636363;
    padding: 3px;
  }
`;

const PreviewImg = styled.img`
  width: auto;
  height: 100px;
  max-width: 90%;
  margin: 5px auto;
`;

const ButtonContainer = styled.div`
  width: 95%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin: 0 auto;
`;

const Button = styled.button`
  width: 49%;
  height: 30px;
  border-radius: 5px;
  margin-top: 10px;
  cursor: pointer;

  border: ${({ id }) => (id === "cancel" ? "2px solid #d0d0d0" : "none")};
  background-color: ${({ id }) => (id === "cancel" ? "#ffffff" : "#ff9b2f")};
  color: ${({ id }) => (id === "submit" ? "#ffffff" : "#000000")};
`;
