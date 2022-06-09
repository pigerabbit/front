import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import * as Api from "api";
import axios from "axios";

import ProductInquiryCard from "./ProductInquiryCard";
import ProductInquiryForm from "./ProductInquiryForm";

const ProductInquiryTab = ({ product }) => {
  const { user } = useSelector((state) => state.user);

  const [inquiries, setInquiries] = useState([]);
  const [myInquiries, setMyInquiries] = useState([]);
  const [isWriting, setIsWriting] = useState(false);
  const [showMyInquiries, setShowMyInquiries] = useState(false);

  const isSeller = product.userId === user.id;

  const getInquiries = async () => {
    try {
      const res = await axios.get(
        Api.serverUrl + `posts?receiver=${product.id}&type=cs`
      );
      setInquiries(res.data.payload.filter((v) => v.type === "cs"));
      setMyInquiries(
        res.data.payload.filter((v) => v.type === "cs" && v.writer === user.id)
      );
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getInquiries();
  }, []);

  return (
    <Container>
      {!isSeller &&
        (!isWriting ? (
          <WriteButton
            onClick={() => {
              setIsWriting((cur) => !cur);
            }}
          >
            문의 작성하기
          </WriteButton>
        ) : (
          <ProductInquiryForm
            productId={product.id}
            setIsWriting={setIsWriting}
            setInquiries={setInquiries}
            setMyInquiries={setMyInquiries}
          />
        ))}
      <Inquiry>
        <InquiryTop>
          <div id="inquiryCount">
            문의 {showMyInquiries ? myInquiries.length : inquiries.length}건
          </div>
          {myInquiries.length > 0 && (
            <MyInquiryButton
              onClick={() => {
                setShowMyInquiries((cur) => !cur);
              }}
              showMyInquiries={showMyInquiries}
            >
              내 문의
            </MyInquiryButton>
          )}
        </InquiryTop>
        {!showMyInquiries
          ? inquiries.map((v) => (
              <ProductInquiryCard
                key={v.postId}
                writerId={v.writer}
                title={v.title}
                content={v.content}
                image={v.postImg}
                createdAt={v.createdAt}
                commentCount={v.commentCount}
                postId={v.postId}
                isSeller={isSeller}
              />
            ))
          : myInquiries.map((v) => (
              <ProductInquiryCard
                key={v.postId}
                writerId={v.writer}
                title={v.title}
                content={v.content}
                image={v.postImg}
                createdAt={v.createdAt}
                commentCount={v.commentCount}
                postId={v.postId}
              />
            ))}
      </Inquiry>
    </Container>
  );
};

export default ProductInquiryTab;

const Container = styled.div`
  width: 100%;
  min-width: 360px;
  max-width: 770px;
  background-color: #ffffff;
  padding: 7px 0;
`;

const WriteButton = styled.div`
  border: 1px solid #636363;
  border-radius: 10px;
  width: 90%;
  height: 50px;
  margin: 25px auto;
  font-size: 16px;
  font-weight: bold;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  &:hover {
    background-color: #f0f0f0;
  }
`;

const Inquiry = styled.div`
  width: 90%;
  margin: 20px auto;
`;

const InquiryTop = styled.div`
  padding-bottom: 20px;
  border-bottom: 2px solid #000000;
  display: flex;
  flex-direction: row;
  align-items: center;

  #inquiryCount {
    font-weight: bold;
  }
`;

const MyInquiryButton = styled.div`
  position: absolute;
  right: 5%;
  width: 80px;
  height: 20px;
  border: 1px solid #d0d0d0;
  border-radius: 5px;
  box-shadow: 0.5px 0.5px 0.5px 0.5px #d0d0d0;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  font-size: 13px;
  cursor: pointer;

  background-color: ${({ showMyInquiries }) =>
    showMyInquiries === true ? "#f0f0f0" : "#ffffff"};

  &:hover {
    background-color: #f0f0f0;
  }
`;
