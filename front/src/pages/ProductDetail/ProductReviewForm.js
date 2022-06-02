import React, { useState, useEffect } from "react";
import styled from "styled-components";
import * as Api from "api";
import { faCropSimple } from "@fortawesome/free-solid-svg-icons";

const ProductReviewForm = ({ productId, setIsWriting }) => {
  const [reviewTitle, setReviewTitle] = useState("");
  const [reviewText, setReviewText] = useState("");
  const [reviewImg, setReviewImg] = useState({});
  const [previewImg, setPreviewImg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    const variables = [
      {
        type: "review",
        receiver: productId,
        title: reviewTitle,
        content: reviewText,
      },
    ];

    if (previewImg) {
      formData.append("file", reviewImg);
    }

    formData.append("type", "review");
    formData.append("receiver", 12345);
    formData.append("title", reviewTitle);
    formData.append("content", reviewText);

    // formData.append(
    //   "body",
    //   new Blob([JSON.stringify(variables)], { type: "application/json" })
    // );

    try {
      for (const keyValue of formData) console.log(keyValue[1]); // ["img", File] File은 객체
      const res = await Api.post(`posts`, formData, {
        Accept: "application/json",
        //'Content-Type': 'multipart/form-data' 넣지마시오!!
      });
      setIsWriting((cur) => !cur);
    } catch (e) {
      console.log("review post 실패");
    }
  };

  const loadFile = (e) => {
    const img = e.target.files[0];
    const formData = new FormData();
    formData.append("file", img);
    setReviewImg(img);
    // for (const keyValue of formData) console.log(keyValue); // ["img", File] File은 객체
    encodeFileToBase64(img);
  };

  const encodeFileToBase64 = (fileBlob) => {
    try {
      const reader = new FileReader();
      reader.readAsDataURL(fileBlob);
      return new Promise((resolve) => {
        reader.onload = () => {
          setPreviewImg(reader.result);

          resolve();
        };
      });
    } catch (e) {
      console.log("preview 생성 실패");
    }
  };

  useEffect(() => {}, []);

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Title>후기 쓰기</Title>
        <ReviewContainer>
          <input
            type="text"
            id="reviewTitle"
            placeholder="제목을 입력해주세요."
            name="reviewTitle"
            value={reviewTitle}
            onChange={(e) => setReviewTitle(e.target.value)}
            required
          />
          <textarea
            id="reviewText"
            placeholder="후기 내용을 작성해주세요."
            name="reviewText"
            rows="6"
            onChange={(e) => setReviewText(e.target.value)}
            required
          />
          <div id="reviewImage">
            <label for="chooseFile" id="buttonForFile">
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
          <Button type="submit" id="submit">
            확인
          </Button>
        </ButtonContainer>
      </Form>
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
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-size: 15px;
  width: 70%;
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

const UploadButton = styled.div`
  #buttonForFile {
    width: 90%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 5px auto;
    padding: 2px 10px;
    height: 35px;
    border: 2px dotted #636363;
    font-size: 13px;
    font-weight: bold;
  }
`;
