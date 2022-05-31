import { faCropSimple } from "@fortawesome/free-solid-svg-icons";
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import * as Api from "api";

const ProductReviewForm = ({ writerId, title, content, image, createdAt }) => {
  const [open, setOpen] = useState(false);
  const [writer, setWriter] = useState({});
  const date = createdAt.split("T")[0];

  const showCard = (e) => {
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
    <Container onClick={showCard}>
      <Title open={open}>
        {writer.name}

        <OpenArrow open={open} />
        <br />
        {title}
        <br />
        {date}
        <br />
      </Title>

      {open && (
        <Content open={open}>
          <div>{content}</div>
          {image && <InfoImg src={image} alt="상세정보 사진"></InfoImg>}
        </Content>
      )}
    </Container>
  );
};

export default ProductReviewForm;

const Container = styled.div`
  position: relative;
  width: 95%;
  margin: 2px auto;
  min-height: 80px;
  vertical-align: middle;
  border-bottom: 1px solid #d0d0d0;
  background-color: #ffffff;
  cursor: pointer;
`;

const Title = styled.div`
  font-size: 16px;
  font-weight: ${({ open }) => (open ? "bold" : "normal")};
  color: #636363;
  padding: 30px 0 0 30px;
`;

const Content = styled.div`
  margin: 30px 0 30px 30px;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  font-size: 15px;
`;

const OpenArrow = styled.i`
  position: absolute;
  right: 30px;
  border: solid black;
  border-width: 0 1.5px 1.5px 0;
  display: inline-block;
  padding: 5px;
  margin: 0 0 0 20px;
  border-color: #636363;
  transform: ${({ open }) => (open ? "rotate(225deg)" : "rotate(45deg)")};
  -webkit-transform: ${({ open }) =>
    open ? "rotate(225deg)" : "rotate(45deg)"};
  cursor: pointer;
`;

const InfoImg = styled.img`
  width: 90%;
  height: auto;
  margin: 0 auto;
`;
