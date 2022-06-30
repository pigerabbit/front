import React, { useState } from "react";
import styled from "styled-components";

const ProductInfoCard = ({ title, content, img }) => {
  const [open, setOpen] = useState(false);

  const showCard = (e) => {
    setOpen((cur) => !cur);
  };

  if (!content) return null;

  return (
    <Container onClick={showCard}>
      <Title open={open}>
        {title}
        <OpenArrow open={open} />
      </Title>

      {open && (
        <Content open={open}>
          <div>{content}</div>
          {img && (
            <InfoImg id="infoImg" src={img} alt="상세정보 사진"></InfoImg>
          )}
        </Content>
      )}
    </Container>
  );
};

export default ProductInfoCard;

const Container = styled.div`
  position: relative;
  width: 95%;
  margin: 2px auto;
  min-height: 80px;
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
  margin: 30px;
  font-size: 15px;
  white-space: pre-wrap;
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
  margin-top: 15px;
  width: 100%;
  height: auto;
`;
