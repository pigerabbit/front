import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import * as Api from "api";
import getKeyByValue from "utils/getKeyByValue";

import MyPageLayout from "../MyPageLayout";
import ProductInput from "./ProductInput";
import CategoryPopup from "./CategoryPopup";
import { parcelCategory, subscribeCategory } from "./CategoryModule";
import { useSelector } from "react-redux";

const ProductRegisterPage = () => {
  const { user } = useSelector((state) => state.user);
  const { state } = useLocation();
  const navigate = useNavigate();

  const [isOpenCategoryPopup, setIsCategoryPopup] = useState(false);
  const [productType, setProductType] = useState(
    (!state && "parcel") ||
      (state?.productType === "post" && "parcel") ||
      "subscribe"
  );
  const [productName, setProductName] = useState(state?.name || "");
  const [productImage, setProductImage] = useState("");
  const [previewImg, setPreviewImg] = useState(state?.images || "");
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
  const [descriptionPreviewImg, setDescriptionPreviewImg] = useState(
    state?.descriptionImg || ""
  );
  const [minPurchaseQty, setMinPurchaseQty] = useState(
    state?.minPurchaseQty || ""
  );
  const [maxPurchaseQty, setMaxPurchaseQty] = useState(
    state?.maxPurchaseQty || ""
  );
  const [shippingFee, setShippingFee] = useState(
    state?.shippingFee === 0 ? "" : state?.shippingFee?.toLocaleString() || ""
  );
  const [shippingFeeCon, setShippingFeeCon] = useState(
    state?.shippingFee === 0
      ? ""
      : state?.shippingFeeCon?.toLocaleString() || ""
  );
  const [useBy, setUseBy] = useState(state?.term || "");
  const [detailInfo, setDetailInfo] = useState(state?.detail || "");
  const [detailInfoImage, setDetailInfoImage] = useState("");
  const [DetailInfoPreviewImg, setDetailInfoPreviewImg] = useState(
    state?.detailImg || ""
  );
  const [shippingInfo, setShippingInfo] = useState(state?.shippingInfo || "");

  const productNameValid = productName.length > 0;
  const productImageValid = productImage || previewImg;
  const categoryValid = category.length > 0;
  const priceValid = Number(price.replaceAll(",", "")) > 0;
  const salePriceValid =
    Number(salePrice.replaceAll(",", "")) > 0 &&
    Number(price.replaceAll(",", "")) > Number(salePrice.replaceAll(",", ""));
  const descriptionValid =
    description.length > 0 || descriptionImage || descriptionPreviewImg;
  const minPurchaseQtyValid = Number(minPurchaseQty) > 0;
  const maxPurchaseQtyValid =
    minPurchaseQtyValid && Number(maxPurchaseQty) >= Number(minPurchaseQty);
  const shippingFeeValid = shippingFee.length > 0;
  const shippingFeeConValid = shippingFeeCon.length > 0;
  const useByValid = Number(useBy) > 0;
  const detailInfoValid =
    detailInfo.length > 0 || detailInfoImage || DetailInfoPreviewImg;
  const shippingInfoValid = shippingInfo.length > 0;

  let formValid =
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

  const setNum = (setValue) => {
    return (value) => {
      if (typeof Number(value) !== "number") return;

      setValue(Number(value));
    };
  };

  const postImages = async (productId) => {
    try {
      const imagesFormData = new FormData();
      imagesFormData.append("images", productImage);

      const descriptionImageFormData = new FormData();
      descriptionImageFormData.append("descriptionImg", descriptionImage);

      const detailImageFormData = new FormData();
      detailImageFormData.append("detailImg", detailInfoImage);

      const imagesReq = productImage
        ? Api.postImg(`products/${productId}/images`, imagesFormData)
        : null;
      const descriptionImgReq = descriptionImage
        ? Api.postImg(
            `products/${productId}/descriptionImg`,
            descriptionImageFormData
          )
        : null;
      const detailImgReq = detailInfoImage
        ? Api.postImg(`products/${productId}/detailImg`, detailImageFormData)
        : null;

      await Promise.all([imagesReq, descriptionImgReq, detailImgReq]);

      navigate(`/markets/${user.id}`, { replace: true });
    } catch (e) {
      // ????????????
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    formValid = false;

    const bodyData = {
      productType: productType === "parcel" ? "post" : "coupon",
      name: productName,
      category: getKeyByValue(
        productType === "parcel" ? parcelCategory : subscribeCategory,
        category
      ),
      price: Number(price.replaceAll(",", "")),
      salePrice: Number(salePrice.replaceAll(",", "")),
      description,
      minPurchaseQty: Number(minPurchaseQty),
      maxPurchaseQty: Number(maxPurchaseQty),
      shippingFee: Number(shippingFee.replaceAll(",", "")),
      shippingFeeCon: Number(shippingFeeCon.replaceAll(",", "")),
      term: useBy,
      detail: detailInfo,
      shippingInfo,
    };

    try {
      let productId = state?.id || "";

      if (!state) {
        const res = await Api.post("products", bodyData);
        productId = res.data.payload.resultProduct.id;
      } else {
        await Api.put(`products/${productId}`, bodyData);
      }

      postImages(productId);
    } catch (error) {
      // ????????????
    }
  };

  return (
    <MyPageLayout
      pageName={!state ? "?????? ??????" : "?????? ??????"}
      previousPage={`/markets/${user.id}`}
      noTabBar={true}
    >
      {isOpenCategoryPopup && (
        <CategoryPopup
          setIsCategoryPopup={setIsCategoryPopup}
          setCategory={setCategory}
          productType={productType}
        />
      )}
      <form onSubmit={handleSubmit}>
        <Section>
          <Title>?????? ??????</Title>
          <OptionContainer>
            <Option
              selected={productType === "parcel"}
              onClick={() => {
                setProductType("parcel");
                setCategory("");
              }}
            >
              ?????? ????????????
            </Option>
            <Option
              selected={productType === "subscribe"}
              onClick={() => {
                setProductType("subscribe");
                setCategory("");
              }}
            >
              ????????? ????????????
            </Option>
          </OptionContainer>
        </Section>

        <Section>
          <Title>?????? ??????</Title>

          <ProductInput
            title="?????????"
            type="text"
            value={productName}
            setValue={setProductName}
            valueValid={productNameValid}
            width={70}
            check={true}
          />

          <ProductInput
            title="?????? ?????????"
            type="file"
            accept="image/*"
            value={productImage}
            setValue={setProductImage}
            valueValid={productImageValid}
            setPreviewImage={setPreviewImg}
            width={70}
            check={true}
          />

          {previewImg && <PreviewImage src={previewImg} />}

          <ProductInput
            title="????????????"
            type="text"
            value={category}
            valueValid={categoryValid}
            width={25}
            check={true}
            handleClick={() => {
              setIsCategoryPopup(true);
            }}
          />

          <ProductInput
            title="??????"
            type="text"
            value={price}
            setValue={setCommaNum(setPrice)}
            valueValid={priceValid}
            width={25}
            check={true}
            unit="???"
          />

          <ProductInput
            title="???????????????"
            type="text"
            value={salePrice}
            setValue={setCommaNum(setSalePrice)}
            valueValid={salePriceValid}
            width={25}
            check={true}
            unit="???"
          />

          <ProductInput
            title="?????? ??????"
            type="textarea"
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
            setPreviewImage={setDescriptionPreviewImg}
            width={70}
            check={false}
          />

          {descriptionPreviewImg && (
            <PreviewImage src={descriptionPreviewImg} />
          )}

          <ProductInput
            title="???????????? ?????? ??????"
            type="text"
            value={minPurchaseQty}
            setValue={setNum(setMinPurchaseQty)}
            valueValid={minPurchaseQtyValid}
            width={25}
            check={true}
            unit="???"
          />

          <ProductInput
            title="??? ?????? ??????"
            type="text"
            value={maxPurchaseQty}
            setValue={setNum(setMaxPurchaseQty)}
            valueValid={maxPurchaseQtyValid}
            width={25}
            check={true}
            unit="???"
          />

          <StockMessage show={minPurchaseQtyValid && maxPurchaseQtyValid}>
            ??????{" "}
            <span>
              {Math.floor(maxPurchaseQty / minPurchaseQty)}?????? ????????????
            </span>
            ??? ?????? ??? ?????????,{" "}
            <span>{maxPurchaseQty % minPurchaseQty}?????? ??????</span>???
            ???????????????.
          </StockMessage>

          {productType === "parcel" && (
            <>
              <ProductInput
                title="?????????"
                type="text"
                value={shippingFee}
                setValue={setCommaNum(setShippingFee)}
                valueValid={shippingFeeValid}
                width={25}
                check={true}
                unit="???"
              />

              <ProductInput
                title="????????????"
                type="text"
                value={shippingFeeCon}
                setValue={setCommaNum(setShippingFeeCon)}
                valueValid={shippingFeeConValid}
                width={25}
                check={true}
                unit="??? ??????"
              />
            </>
          )}

          {productType === "subscribe" && (
            <ProductInput
              title="????????? ????????????"
              type="number"
              value={useBy}
              setValue={setUseBy}
              valueValid={useByValid}
              width={25}
              check={true}
              unit="??? ??????"
            />
          )}
        </Section>

        <Section>
          <Title>?????? ??????</Title>

          <ProductInput
            title="?????? ??????"
            type="textarea"
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
            setPreviewImage={setDetailInfoPreviewImg}
            width={70}
            check={false}
          />

          {DetailInfoPreviewImg && <PreviewImage src={DetailInfoPreviewImg} />}

          {productType === "parcel" && (
            <ProductInput
              title="?????? ??????"
              type="textarea"
              value={shippingInfo}
              setValue={setShippingInfo}
              valueValid={shippingInfoValid}
              width={70}
              check={true}
            />
          )}
        </Section>

        <SubmitButtom type="submit" disabled={!formValid}>
          ????????????
        </SubmitButtom>
      </form>
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

const StockMessage = styled.div`
  width: 70%;
  margin-left: 29%;
  margin-bottom: 10px;
  font-size: 3vw;
  @media (min-width: 500px) {
    font-size: 15px;
  }
  color: ${({ show }) => (show ? "black;" : "white;")};

  > span {
    color: ${({ show }) => (show ? "#ff9b2f;" : "white;")};
  }
`;

const SubmitButtom = styled.button`
  ${({ disabled }) => !disabled && "cursor: pointer;"};
  box-sizing: border-box;
  width: 40%;
  margin: 3% 30% 3% 30%;
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
