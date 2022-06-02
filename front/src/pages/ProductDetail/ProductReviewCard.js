import React, { useState, useEffect } from "react";
import styled from "styled-components";
import * as Api from "api";

const ProductReviewCard = ({
  writerId,
  title,
  content,
  image,
  createdAt,
  key,
}) => {
  const [open, setOpen] = useState(false);
  const [writer, setWriter] = useState({});
  const date = createdAt.split("T")[0];

  const showDetail = (e) => {
    setOpen((cur) => !cur);
  };

  const getWriter = async () => {
    try {
      const res = await Api.get(`users/${writerId}`);
      setWriter(res.data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getWriter();
  }, []);

  return (
    <Container onClick={showDetail} open={open} image={image}>
      <Header>
        {/* <WriterImg src={writer.imageLink} alt="상세정보 사진"></WriterImg> */}
        <WriterImg>
          <img src={image} alt="사용자 사진" />
        </WriterImg>
        <div id="reviewTop">
          <ReviewTitle open={open} image={image}>
            {title}
          </ReviewTitle>
          <WriterInfo>
            {writer.name} | {date}
          </WriterInfo>
        </div>
      </Header>
      <Content open={open} image={image}>
        {content}
      </Content>
      {image && <ReviewImg src={image} alt="리뷰 사진" open={open}></ReviewImg>}
    </Container>
  );
};

export default ProductReviewCard;

const Container = styled.div`
  position: relative;
  width: 100%;
  margin: 2px auto;
  min-height: 130px;
  vertical-align: middle;
  border-bottom: 1px solid #d0d0d0;
  background-color: ${({ open, image }) =>
    (open !== true && image !== null) || image === null
      ? "#ffffff"
      : "#f8f8fB"};
  cursor: ${({ image }) => (image ? "pointer" : "default")};

  @media (max-width: 500px) {
    cursor: default;
    background-color: #ffffff;
  }
`;

const Header = styled.div`
  font-size: 16px;
  color: #636363;
  padding: 20px 0 10px 20px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
`;

const WriterImg = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #d0d0d0;
  box-shadow: 0.5px 0.5px 0.5px 0.5px #d0d0d0;
  position: absolute;

  img {
    width: 100%;
    height: 100%;
    max-width: 100%;
    max-height: 100%;
    border-radius: 50%;
    font-size: 10px;
  }
`;

const ReviewTitle = styled.div`
  font-size: 15px;
  font-weight: bold;
  margin-left: 50px;
  margin-right: ${({ open, image }) => (!open && image ? "115px" : "10px")};

  @media (max-width: 500px) {
    margin-right: 10px;
  }
`;

const WriterInfo = styled.div`
  display: inline-block;
  margin-left: 50px;
  font-size: 14px;
`;

const Content = styled.div`
  margin: ${({ open, image }) =>
    !open && image ? "0 110px 20px 70px" : "0 20px 20px 70px"};
  font-size: 15px;
  display: flex;
  align-items: center;
  flex-direction: row;

  @media (max-width: 500px) {
    margin: 0 20px 20px 70px;
  }
`;

const ReviewImg = styled.img`
  width: ${({ open }) => (!open ? "85px" : "300px")};
  height: ${({ open }) => (!open ? "85px" : "auto")};
  border-radius: 10px;
  margin-bottom: ${({ open }) => (!open ? "0px" : "20px")};
  position: ${({ open }) => (!open ? "absolute" : "relative")};
  top: ${({ open }) => (!open ? "20px" : "0px")};
  right: 10px;
  margin-left: ${({ open }) => (!open ? "auto" : "80px")};
  align-items: center;

  @media (max-width: 500px) {
    width: 270px;
    height: auto;
    position: relative;
    top: 0px;
    margin: 0 0 20px 80px;
  }
`;
