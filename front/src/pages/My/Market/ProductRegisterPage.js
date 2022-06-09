import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import * as Api from "api";

import MyPageLayout from "../MyPageLayout";
import ProductInput from "./ProductInput";
import CategoryPopup from "./CategoryPopup";
import { parcelCategory, subscribeCategory } from "./category";
import axios from "axios";

const ProductRegisterPage = () => {
  const { state } = useLocation();

  const [isOpenCategoryPopup, setIsCategoryPopup] = useState(false);
  const [productType, setProductType] = useState(
    (!state && "parcel") ||
      (state?.productType === "post" && "parcel") ||
      "subscribe"
  );
  const [productName, setProductName] = useState(state?.name || "");
  const [productImage, setProductImage] = useState(state?.images || "");
  const [previewImg, setPreviewImg] = useState("");
  const [category, setCategory] = useState(
    state?.productType === "post"
      ? parcelCategory[state?.category]
      : subscribeCategory[state?.category] || ""
  );
  const [price, setPrice] = useState(state?.price.toLocaleString() || "");
  const [salePrice, setSalePrice] = useState(
    state?.salePrice.toLocaleString() || ""
  );
  const [description, setDescription] = useState(state?.description || "");
  const [descriptionImage, setDescriptionImage] = useState("");
  const [minPurchaseQty, setMinPurchaseQty] = useState(
    state?.minPurchaseQty || ""
  );
  const [maxPurchaseQty, setMaxPurchaseQty] = useState(
    state?.maxPurchaseQty || ""
  );
  const [shippingFee, setShippingFee] = useState(
    state?.shippingFee.toLocaleString() || ""
  );
  const [shippingFeeCon, setShippingFeeCon] = useState(
    state?.shippingFeeCon.toLocaleString() || ""
  );
  const [useBy, setUseBy] = useState(state?.dueDate || "");
  const [detailInfo, setDetailInfo] = useState(state?.detail || "");
  const [detailInfoImage, setDetailInfoImage] = useState("");
  const [shippingInfo, setShippingInfo] = useState(state?.shippingInfo || "");

  const productNameValid = productName.length > 0;
  const productImageValid = productImage.length > 0;
  const categoryValid = category.length > 0;
  const priceValid = Number(price.replaceAll(",", "")) > 0;
  const salePriceValid =
    Number(salePrice.replaceAll(",", "")) > 0 &&
    Number(price.replaceAll(",", "")) > Number(salePrice.replaceAll(",", ""));
  const descriptionValid =
    description.length > 0 || descriptionImage.length > 0;
  const minPurchaseQtyValid = Number(minPurchaseQty) > 0;
  const maxPurchaseQtyValid = Number(maxPurchaseQty) > Number(minPurchaseQty);
  const shippingFeeValid = shippingFee.length > 0;
  const shippingFeeConValid = shippingFeeCon.length > 0;
  const useByValid = Number(useBy) > 0;
  const detailInfoValid = detailInfo.length > 0 || detailInfoImage.length > 0;
  const shippingInfoValid = shippingInfo.length > 0;

  const formValid =
    productNameValid &&
    productImageValid &&
    categoryValid &&
    priceValid &&
    salePriceValid &&
    descriptionValid &&
    minPurchaseQtyValid &&
    maxPurchaseQtyValid &&
    (productType === "parcel"
      ? shippingFeeValid && shippingFeeConValid && shippingInfoValid
      : useByValid) &&
    detailInfoValid;

  const setCommaNum = (setValue) => {
    return (value) => {
      if (typeof Number(value) !== "number") return;
      const removedCommaValue = Number(value.replaceAll(",", ""));

      if (isNaN(removedCommaValue)) return;
      setValue(removedCommaValue.toLocaleString());
    };
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <MyPageLayout pageName={!state ? "판매 등록" : "판매 편집"}>
      {isOpenCategoryPopup && (
        <CategoryPopup
          setIsCategoryPopup={setIsCategoryPopup}
          setCategory={setCategory}
          productType={productType}
        />
      )}
      <form onSubmit={handleSubmit}>
        <Section>
          <Title>판매 유형</Title>
          <OptionContainer>
            <Option
              selected={productType === "parcel"}
              onClick={() => {
                setProductType("parcel");
                setCategory("");
              }}
            >
              택배 공동구매
            </Option>
            <Option
              selected={productType === "subscribe"}
              onClick={() => {
                setProductType("subscribe");
                setCategory("");
              }}
            >
              이용권 공동구매
            </Option>
          </OptionContainer>
        </Section>

        <Section>
          <Title>상품 설명</Title>

          <ProductInput
            title="상품명"
            type="text"
            value={productName}
            setValue={setProductName}
            valueValid={productNameValid}
            width={70}
            check={true}
          />

          <ProductInput
            title="상품 이미지"
            type="file"
            accept="image/*"
            value={productImage}
            setValue={setProductImage}
            valueValid={productImageValid}
            setImage={setPreviewImg}
            width={70}
            check={true}
          />

          {previewImg && <PreviewImage src={previewImg} />}

          <ProductInput
            title="카테고리"
            type="text"
            value={category}
            setValue={setCategory}
            valueValid={categoryValid}
            width={25}
            check={true}
            onClick={() => {
              setIsCategoryPopup(true);
            }}
          />

          <ProductInput
            title="정가"
            type="text"
            value={price}
            setValue={setCommaNum(setPrice)}
            valueValid={priceValid}
            width={25}
            check={true}
            unit="원"
          />

          <ProductInput
            title="공동구매가"
            type="text"
            value={salePrice}
            setValue={setCommaNum(setSalePrice)}
            valueValid={salePriceValid}
            width={25}
            check={true}
            unit="원"
          />

          <ProductInput
            title="상품 설명"
            type="text"
            value={description}
            setValue={setDescription}
            valueValid={descriptionValid}
            width={70}
            check={true}
          />

          <ProductInput
            title=""
            type="file"
            accept="image/*"
            value={descriptionImage}
            setValue={setDescriptionImage}
            width={70}
            check={false}
          />

          <ProductInput
            title="공동구매 성립 수량"
            type="number"
            value={minPurchaseQty}
            setValue={setMinPurchaseQty}
            valueValid={minPurchaseQtyValid}
            width={25}
            check={true}
            unit="개"
          />

          <ProductInput
            title="총 판매 수량"
            type="number"
            value={maxPurchaseQty}
            setValue={setMaxPurchaseQty}
            valueValid={maxPurchaseQtyValid}
            width={25}
            check={true}
            unit="개"
          />

          {productType === "parcel" && (
            <>
              <ProductInput
                title="배송비"
                type="text"
                value={shippingFee}
                setValue={setCommaNum(setShippingFee)}
                valueValid={shippingFeeValid}
                width={25}
                check={true}
                unit="원"
              />

              <ProductInput
                title="무료배송"
                type="text"
                value={shippingFeeCon}
                setValue={setCommaNum(setShippingFeeCon)}
                valueValid={shippingFeeConValid}
                width={25}
                check={true}
                unit="원 이상"
              />
            </>
          )}

          {productType === "subscribe" && (
            <ProductInput
              title="이용권 사용기한"
              type="number"
              value={useBy}
              setValue={setUseBy}
              valueValid={useByValid}
              width={25}
              check={true}
              unit="일 이내"
            />
          )}
        </Section>

        <Section>
          <Title>상세 정보</Title>

          <ProductInput
            title="상세 정보"
            type="text"
            value={detailInfo}
            setValue={setDetailInfo}
            valueValid={detailInfoValid}
            width={70}
            check={true}
          />

          <ProductInput
            title=""
            type="file"
            accept="image/*"
            value={detailInfoImage}
            setValue={setDetailInfoImage}
            width={70}
            check={false}
          />

          {productType === "parcel" && (
            <ProductInput
              title="배송 안내"
              type="text"
              value={shippingInfo}
              setValue={setShippingInfo}
              valueValid={shippingInfoValid}
              width={70}
              check={true}
            />
          )}
        </Section>

        <SubmitButtom type="submit" disabled={!formValid}>
          등록하기
        </SubmitButtom>
      </form>

      <Section />
    </MyPageLayout>
  );
};

export default ProductRegisterPage;

const Section = styled.div`
  box-sizing: border-box;
  margin-top: 5px;
  background-color: white;
  width: 100%;
  padding: 38px 10%;
  @media (max-width: 440px) {
    padding: 32px 10%;
  }
  box-shadow: 0 3px 3px -3px #c7c7c7;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.div`
  padding-bottom: 10px;
  width: 100%;
  text-align: center;
  color: #ff9b2f;
  margin-bottom: 3%;

  font-size: 3.8vw;
  @media (min-width: 500px) {
    font-size: 20px;
  }
`;

const OptionContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const Option = styled.div`
  box-shadow: ${({ selected }) =>
    selected ? "0 0 4px #F79831;" : "0 0 4px #A1A1A1;"};
  ${({ selected }) => (selected ? "font-weight: 400;" : "color: #ABABAB;")};
  cursor: pointer;
  border-radius: 5px;
  padding: 3%;
  width: 30%;
  text-align: center;

  font-size: 3.5vw;
  @media (min-width: 500px) {
    font-size: 18px;
  }

  & + div {
    margin-left: 3%;
  }
`;

const PreviewImage = styled.img`
  box-shadow: 0 0 4px #d0d0d0;
  margin-left: 28%;
  margin-bottom: 10px;
  width: 70%;
`;

const SubmitButtom = styled.button`
  ${({ disabled }) => !disabled && "cursor: pointer;"};
  box-sizing: border-box;
  width: 40%;
  margin: 3% 30% 8% 30%;
  padding: 3%;
  border: none;
  border-radius: 5px;
  background-color: ${({ disabled }) => (disabled ? "#D0D0D0" : "#ffb564;")};
  color: white;

  font-size: 3.8vw;
  @media (min-width: 500px) {
    font-size: 20px;
  }
`;
