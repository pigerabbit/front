import React, { useState } from "react";
import styled from "styled-components";
import * as Api from "api";

import MyPageLayout from "../MyPageLayout";
import ProductInput from "./ProductInput";
import { useLocation } from "react-router-dom";

const ProductRegisterPage = () => {
  const { state } = useLocation();
  const [productType, setProductType] = useState(
    (!state && "parcel") ||
      (state?.productType === "post" && "parcel") ||
      "subscribe"
  );
  const [productName, setProductName] = useState(state?.name || "");
  const [productImage, setProductImage] = useState(state?.images || "");
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
  const [useBy, setUseBy] = useState("");
  const [detailInfo, setDetailInfo] = useState(state?.detail || "");
  const [detailInfoImage, setDetailInfoImage] = useState("");
  const [shippingInfo, setShippingInfo] = useState(state?.shippingInfo || "");

  const productNameValid = productName.length > 0;
  const productImageValid = productImage.length > 0;
  const priceValid = Number(price.replaceAll(",", "")) > 0;
  const salePriceValid =
    Number(salePrice.replaceAll(",", "")) > 0 &&
    Number(price.replaceAll(",", "")) > Number(salePrice.replaceAll(",", ""));
  const descriptionValid = description.length > 0;
  const descriptionImageValid = descriptionImage.length > 0;
  const minPurchaseQtyValid = Number(minPurchaseQty) > 0;
  const maxPurchaseQtyValid = Number(maxPurchaseQty) > Number(minPurchaseQty);
  const shippingFeeValid = shippingFee.length > 0;
  const shippingFeeConValid = shippingFeeCon.length > 0;
  const useByValid = Number(useBy) > 0;
  const detailInfoValid = detailInfo.length > 0;
  const detailInfoImageValid = detailInfoImage.length > 0;
  const shippingInfoValid = shippingInfo.length > 0;

  const setCommaNum = (setValue) => {
    return (value) => {
      if (typeof Number(value) !== "number") return;
      const removedCommaValue = Number(value.replaceAll(",", ""));

      if (isNaN(removedCommaValue)) return;
      setValue(removedCommaValue.toLocaleString());
    };
  };

  return (
    <MyPageLayout pageName={"판매등록"}>
      <Section>
        <Title>판매 유형</Title>
        <OptionContainer>
          <Option
            selected={productType === "parcel"}
            onClick={() => setProductType("parcel")}
          >
            택배 공동구매
          </Option>
          <Option
            selected={productType === "subscribe"}
            onClick={() => setProductType("subscribe")}
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
          width={65}
        />

        <ProductInput
          title="상품 이미지"
          type="file"
          accept="image/*"
          value={productImage}
          setValue={setProductImage}
          valueValid={productImageValid}
          width={65}
        />

        <ProductInput
          title="정가"
          type="text"
          value={price}
          setValue={setCommaNum(setPrice)}
          valueValid={priceValid}
          width={25}
          unit="원"
        />

        <ProductInput
          title="공동구매가"
          type="text"
          value={salePrice}
          setValue={setCommaNum(setSalePrice)}
          valueValid={salePriceValid}
          width={25}
          unit="원"
        />

        <ProductInput
          title="상품 설명"
          type="text"
          value={description}
          setValue={setDescription}
          valueValid={descriptionValid}
          width={65}
        />

        <ProductInput
          title="공동구매 성립 수량"
          type="number"
          value={minPurchaseQty}
          setValue={setMinPurchaseQty}
          valueValid={minPurchaseQtyValid}
          width={25}
          unit="개"
        />

        <ProductInput
          title="총 판매 수량"
          type="number"
          value={maxPurchaseQty}
          setValue={setMaxPurchaseQty}
          valueValid={maxPurchaseQtyValid}
          width={25}
          unit="개"
        />

        <ProductInput
          title="배송비"
          type="text"
          value={shippingFee}
          setValue={setCommaNum(setShippingFee)}
          valueValid={shippingFeeValid}
          width={25}
          unit="원"
        />

        <ProductInput
          title="무료배송"
          type="text"
          value={shippingFeeCon}
          setValue={setCommaNum(setShippingFeeCon)}
          valueValid={shippingFeeConValid}
          width={25}
          unit="원 이상"
        />
      </Section>

      <Section>
        <Title>상세 정보</Title>

        <ProductInput
          title="상세 정보"
          type="text"
          value={detailInfo}
          setValue={setDetailInfo}
          valueValid={detailInfoValid}
          width={65}
        />

        <ProductInput
          title="배송 안내"
          type="text"
          value={shippingInfo}
          setValue={setShippingInfo}
          valueValid={shippingInfoValid}
          width={65}
        />
      </Section>

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
