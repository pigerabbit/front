import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import * as Api from "api";

import MyPageLayout from "../MyPageLayout";
import ProductCard from "./ProductCard";
import ConfirmationPopup from "../ConfirmationPopup";

const MarketPage = () => {
  const { user } = useSelector((state) => state.user);
  const { id } = useParams();
  const [isOpenPopup, setIsOpenPopup] = useState(false);
  const [products, setProducts] = useState([]);
  const [currentProduct, SetCurrentProduct] = useState("");

  const navigate = useNavigate();

  const getProductData = async () => {
    const res = await Api.get("markets", id);
    setProducts(res.data.payload.resultList);
  };

  const handleDeleteProduct = () => {
    setProducts((currentList) => {
      const index = currentList.findIndex((cur) => cur.id === currentProduct);
      const copy = [...currentList];
      copy.splice(index, 1);
      return copy;
    });

    setIsOpenPopup(false);

    Api.delete(`products/${currentProduct}`);
  };

  useEffect(() => {
    getProductData();
  }, []);

  return (
    <MyPageLayout pageName={user?.business[0].businessName}>
      <Container>
        {user?.id === id && (
          <SaleButton
            onClick={() => {
              navigate("/register/product");
            }}
          >
            <FontAwesomeIcon icon={faCirclePlus} />
            판매 등록하기
          </SaleButton>
        )}

        {products.length > 0 && (
          <TotalNumber>총 {products.length}개</TotalNumber>
        )}

        {products.map((product) => (
          <ProductCard
            product={product}
            SetCurrentProduct={SetCurrentProduct}
            setIsOpenPopup={setIsOpenPopup}
            key={product.id}
          ></ProductCard>
        ))}
      </Container>

      {products.length === 0 && (
        <NoReviewContainer>
          <img
            src={`${process.env.PUBLIC_URL}/images/noSale.svg`}
            alt="no nearby"
          />
          등록된 판매가 없습니다.
        </NoReviewContainer>
      )}

      <ConfirmationPopup
        handleButtonClick={handleDeleteProduct}
        isOpenPopup={isOpenPopup}
        setIsOpenPopup={setIsOpenPopup}
        buttonContent={`판매 삭제`}
      >
        <ConfirmationContent>
          <span>판매를 정말 삭제하시겠습니까?</span>
          <span>현재 오픈된 공동구매들은 모두 취소됩니다.</span>
        </ConfirmationContent>
      </ConfirmationPopup>
    </MyPageLayout>
  );
};

export default MarketPage;

const Container = styled.div`
  box-sizing: border-box;
  padding-bottom: 80px;
  @media (max-width: 440px) {
    padding-bottom: 70px;
  }
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SaleButton = styled.div`
  position: relative;
  cursor: pointer;
  margin-top: 10px;
  width: 30%;
  background-color: #ffb564;
  color: white;
  border-radius: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.2);

  font-size: 2.5vw;
  padding: 2.5vw;
  @media (min-width: 770px) {
    font-size: 20px;
    padding: 20px;
  }

  > svg {
    position: absolute;
    font-size: 4vw;
    left: 2vw;
    @media (min-width: 770px) {
      font-size: 32px;
      left: 15px;
    }
  }
`;

const TotalNumber = styled.div`
  width: 90%;
  max-width: 550px;
  margin-top: 10px;
  font-size: 2.5vw;
  @media (min-width: 620px) {
    font-size: 16px;
  }
`;

const ConfirmationContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 8vw;
  font-size: 3.5vw;
  line-height: 5vw;
  @media (min-width: 600px) {
    margin-top: 45px;
    font-size: 22px;
    line-height: 30px;
  }
`;

const NoReviewContainer = styled.div`
  margin-top: 0;
  display: flex;
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
