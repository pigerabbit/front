import React, { useEffect, useState } from "react";
import styled from "styled-components";
import * as Api from "api";

import ProductInquiryCard from "./ProductInquiryCard";
import ProductInquiryForm from "./ProductInquiryForm";

const ProductInquiryTab = ({ product, user }) => {
  const [inquiries, setInquiries] = useState([]);
  const [myInquiries, setMyInquiries] = useState([]);
  const [isWriting, setIsWriting] = useState(false);
  const [showMyInquiries, setShowMyInquiries] = useState(false);
  const [isInquiryFetched, setIsInquiryFetched] = useState(false);

  const isSeller = product.userId === user.id;

  const handleDeleteMyInquiry = (postId) => {
    const remainedInquiries = inquiries.filter(
      (inquiry) => inquiry.postId !== postId
    );
    const remainedMyInquiries = myInquiries.filter(
      (myInquiry) => myInquiry.postId !== postId
    );

    if (remainedInquiries.length !== 0 && remainedMyInquiries.length !== 0) {
      setIsInquiryFetched(false);
      setInquiries(remainedInquiries);
      setMyInquiries(remainedMyInquiries);
      setIsInquiryFetched(true);
    }
  };

  const getInquiries = async () => {
    try {
      const res = await Api.get(`posts`, "", {
        receiver: product.id,
        type: "cs",
      });
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
          ? inquiries.map((inquiry) => (
              <ProductInquiryCard
                key={inquiry.postId}
                inquiry={inquiry}
                onDeleteMyInquiry={handleDeleteMyInquiry}
                isSeller={isSeller}
                isMyInquiry={inquiry.writer === user.id}
              />
            ))
          : myInquiries.map((inquiry) => (
              <ProductInquiryCard
                key={inquiry.postId}
                inquiry={inquiry}
                onDeleteMyInquiry={handleDeleteMyInquiry}
                isMyInquiry={inquiry.writer === user.id}
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
