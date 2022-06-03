import React, { useState, useEffect } from "react";
import styled from "styled-components";
import * as Api from "api";

const ProductInquiryCard = ({
  writerId,
  title,
  content,
  image,
  createdAt,
  commentCount,
  key,
}) => {
  const [open, setOpen] = useState(false);
  const [writer, setWriter] = useState({});
  const date = createdAt.split("T")[0];
  const isReplied = commentCount > 0 ? true : false;

  const showDetail = (e) => {
    setOpen((cur) => !cur);
  };

  const getWriter = async () => {
    try {
      const res = await Api.get(`users/${writerId}`);
      setWriter(res.data.payload);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getWriter();
  }, []);

  return (
    <Container onClick={showDetail} open={open} image={image}>
      <Header open={open}>
        <div id="inquiryTop">
          <InquiryTitle open={open} image={image}>
            {title}
          </InquiryTitle>
          <InquiryInfo>
            <ShowReplied isReplied={isReplied}>
              {isReplied ? "답변완료" : "미답변"}
            </ShowReplied>{" "}
            | {writer.name} | {date}
          </InquiryInfo>
        </div>
      </Header>
      {open && <Content>{content}</Content>}
      {image && (
        <InquiryImg src={image} alt="문의 사진" open={open}></InquiryImg>
      )}
    </Container>
  );
};

export default ProductInquiryCard;

const Container = styled.div`
  position: relative;
  width: 100%;
  margin: 2px 0;
  border-bottom: 1px solid #d0d0d0;
  padding-top: 30px;
  padding-bottom: 30px;
  background-color: ${({ open }) => (open ? "#f8f8fB" : "#ffffff")};
  cursor: pointer;

  &:hover {
    background-color: #f8f8fb;
  }
`;

const Header = styled.div`
  font-size: 16px;
  color: #636363;
  margin-bottom: ${({ open }) => (!open ? "0px" : "20px")};
`;

const InquiryTitle = styled.div`
  font-size: 15px;
  margin-left: 20px;
  margin-right: ${({ open, image }) => (!open && image ? "115px" : "10px")};
  font-weight: ${({ open }) => (!open ? "normal" : "bold")};

  @media (max-width: 500px) {
    margin-right: 10px;
  }
`;

const InquiryInfo = styled.div`
  display: inline-block;
  margin-left: 20px;
  font-size: 14px;
  margin-top: 15px;
`;

const ShowReplied = styled.p`
  display: inline-block;
  font-weight: bold;
  color: ${({ isReplied }) => (isReplied ? "#f79831" : "#636363")};
`;

const Content = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  margin: 20px 20px 20px 20px;
  border-top: 1px solid #636363;
  padding-top: 20px;
  font-size: 15px;
`;

const InquiryImg = styled.img`
  width: ${({ open }) => (!open ? "60px" : "150px")};
  height: ${({ open }) => (!open ? "60px" : "auto")};
  border-radius: 10px;
  margin-bottom: ${({ open }) => (!open ? "0px" : "20px")};
  position: ${({ open }) => (!open ? "absolute" : "relative")};
  top: ${({ open }) => (!open ? "20px" : "0px")};
  right: 10px;
  margin-left: ${({ open }) => (!open ? "auto" : "25px")};
  align-items: center;

  /* @media (max-width: 500px) {
    width: 270px;
    height: auto;
    position: relative;
    top: 0px;
    margin: 0 0 20px 80px;
  } */
`;
