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
<<<<<<< HEAD
import NotFoundPage from "components/NotFoundPage";
=======
import LoadingSpinner from "components/LoadingSpinner";
>>>>>>> user

const MarketPage = () => {
  const { user } = useSelector((state) => state.user);
  const { id } = useParams();
  const [isOpenPopup, setIsOpenPopup] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [marketName, setMarketName] = useState("");
  const [currentProduct, setCurrentProduct] = useState("");
  const [notFound, setNotFound] = useState(false);

  const navigate = useNavigate();

  const getProductData = async () => {
    try {
      const res = await Api.get("markets", id);
      setProducts(res.data.payload.resultList);
      setMarketName(
        res.data.payload.resultList[0]?.userInfo.business[0]?.businessName || ""
      );
    } catch (error) {
      setNotFound(true);
    }
  };

  const handleDeleteProduct = () => {
    try {
      Api.delete(`products/${currentProduct}`);

      setProducts((currentList) => {
        const index = currentList.findIndex((cur) => cur.id === currentProduct);
        const copy = [...currentList];
        copy.splice(index, 1);
        return copy;
      });

      setIsOpenPopup(false);
    } catch (e) {
      // 에러처리
    }
  };

  const handleRegisterBtnClick = () => {
    navigate("/register/product", { replace: true });
  };

  useEffect(() => {
    getProductData();
  }, []);

  if (notFound) return <NotFoundPage text="찾을 수 없는 판매처입니다." />;

  return (
    <MyPageLayout
      pageName={
        (user?.id === id && user?.business[0]?.businessName) || marketName || ""
      }
      previousPage={-1}
    >
      {isLoading ? (
        <LoadingContainer>
          <LoadingSpinner />
        </LoadingContainer>
      ) : (
        <Container>
          {user?.id === id && (
            <ProductRegisterButton onClick={handleRegisterBtnClick}>
              <FontAwesomeIcon icon={faCirclePlus} />
              판매 등록하기
            </ProductRegisterButton>
          )}

          {products.length > 0 && (
            <TotalNumber>총 {products.length}개</TotalNumber>
          )}

          {products.map((product) => (
            <ProductCard
              product={product}
              setCurrentProduct={setCurrentProduct}
              setIsOpenPopup={setIsOpenPopup}
              key={product.id}
            ></ProductCard>
          ))}

          {products.length === 0 && (
            <NoContentContainer>
              <img
                src={`${process.env.PUBLIC_URL}/images/noSale.svg`}
                alt="no nearby"
              />
              등록된 판매가 없습니다.
            </NoContentContainer>
          )}
        </Container>
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

const LoadingContainer = styled.div`
  height: 80vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Container = styled.div`
  position: relative;
  box-sizing: border-box;
  width: 100%;
  min-height: 80vh;
  padding: 10px 0;
  margin-bottom: 70px;
  @media (max-width: 440px) {
    margin-bottom: 60px;
  }
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ProductRegisterButton = styled.div`
  position: relative;
  cursor: pointer;
  width: 30%;
  min-width: 180px;
  background-color: #ffb564;
  color: white;
  border-radius: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.2);

  font-size: 15px;
  padding: 14px;
  @media (min-width: 610px) {
    font-size: 2.5vw;
    padding: 2.5vw;
  }
  @media (min-width: 770px) {
    font-size: 20px;
    padding: 20px;
  }

  > svg {
    position: absolute;
    font-size: 22px;
    left: 12px;
    @media (min-width: 610px) {
      font-size: 4vw;
      left: 2vw;
    }
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

const NoContentContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 40%;
  min-width: 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 16px;
  @media (min-width: 650px) {
    font-size: 20px;
  }

  > img {
    width: 100%;
    margin-bottom: 5%;
  }
`;
