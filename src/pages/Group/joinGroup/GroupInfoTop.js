import React from "react";
import styled from "styled-components";
import { useNavigate, useLocation, Link } from "react-router-dom";

import { states } from "pages/Group/GroupModule";

const ProductDetailTop = ({ group, product, seller }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const dateHoursDifference = Math.floor(
    (new Date(group.deadline) - new Date()) / (3600 * 1000)
  );
  const isImminent = location.state
    ? location.state.isImminent
    : dateHoursDifference < 24 ||
      group.remainedPersonnel / product.minPurchaseQty < 0.1 ||
      group.remainedPersonnel <= 3;

  const {
    name,
    price,
    salePrice,
    discountRate,
    shippingFee,
    shippingFeeCon,
    images,
  } = product;

  const [
    priceStr,
    salePriceStr,
    discountRateStr,
    shippingFeeStr,
    shippingFeeConStr,
  ] = [price, salePrice, discountRate, shippingFee, shippingFeeCon].map((v) =>
    v.toLocaleString()
  );

  let shippingConStr = "";
  if (shippingFeeCon > 0) {
    shippingConStr = ` (${shippingFeeConStr}원 이상 무료 배송)`;
  }

  return (
    <Container>
      <ImgContainer>
        <img id="productImg" src={images} alt={name + " 사진"} />
      </ImgContainer>
      <Seller>
        {seller.business[0].businessName}
        <GoToProduct to={`/products/${product.id}`}>
          판매 페이지로 이동
        </GoToProduct>
      </Seller>
      <InfoContainer>
        <p id="groupName">{group.groupName}</p>
        <span>
          <p>~ {group.deadline}</p>
          <GroupState>
            {group.state === 0 ? (
              <>
                {isImminent === true && <p id="imminent">"마감 임박"</p>}
                <p id="remain">{group.remainedPersonnel}개</p> 남음
              </>
            ) : (
              <EndedState
                color={states[group.state][2]}
                bgColor={states[group.state][1]}
              >
                {states[group.state][0]}
              </EndedState>
            )}
          </GroupState>
        </span>
        <PriceInfo>
          <DiscountRate>{discountRateStr}%</DiscountRate>
          <Price>
            <p id="salePrice">{salePriceStr} 원</p>
            <p id="price">{priceStr} 원</p>
          </Price>
        </PriceInfo>
        <p id="shippingFee">
          {shippingFee
            ? `배송비 ${shippingFeeStr}원${shippingConStr}`
            : "무료배송"}
        </p>
      </InfoContainer>
      <DescriptionContainer>
        {group.groupType !== "normal" ? (
          <Location>
            <h3>픽업 주소</h3>
            <p>{group.location}</p>
          </Location>
        ) : (
          <Location>
            <h3>판매처 주소</h3>
            <p>{seller.business[0].businessLocation}</p>
          </Location>
        )}
      </DescriptionContainer>
    </Container>
  );
};

export default ProductDetailTop;

const Container = styled.div`
  width: 100%;
  min-width: 360px;
  max-width: 770px;
  background-color: #ffffff;
  padding-top: 50px;
`;

const ImgContainer = styled.div`
  width: 95%;
  margin: 0 auto;
  height: 360px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background-color: #f8f8f8;

  #productImg {
    width: auto;
    max-width: 100%;
    height: 360px;
    object-fit: cover;
  }
`;

const Seller = styled.div`
  margin: 20px 0 13px 20px;
  font-size: 15px;
  font-weight: bold;
  display: flex;
  align-items: center;
`;

const GoToProduct = styled(Link)`
  display: inline-block;
  text-decoration: none;
  width: 120px;
  height: 30px;
  color: #ffffff;
  background-color: #ffb564;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  font-size: 13px;
  margin-left: 10px;

  cursor: pointer;
`;

const InfoContainer = styled.div`
  margin-left: 20px;

  #groupName {
    display: inline-block;
    width: 60%;
    @media (max-width: 360px) {
      width: 57%;
    }
  }

  #shippingFee {
    margin-top: 10px;
    font-size: 13px;
  }

  > span {
    position: absolute;
    right: 30px;
    color: #ff0000;
  }

  > span > p {
    color: #f79831;
    font-weight: bold;

    @media (max-width: 500px) {
      font-size: 12px;
    }
  }
`;

const GroupState = styled.div`
  display: flex;
  flex-direction: row;
  align-items: baseline;
  justify-content: flex-end;
  margin-top: 10px;
  color: #000000;

  font-size: 23px;

  #imminent {
    color: #ff0000;
    font-weight: bold;
    font-size: 13px;
    margin-right: 5px;

    @media (max-width: 500px) {
      font-size: 11px;
    }
  }

  #remain {
    font-weight: bold;
    margin-right: 5px;
  }

  @media (max-width: 500px) {
    font-size: 18px;
  }
`;

const EndedState = styled.div`
  font-weight: bold;
  padding: 5px;
  color: ${({ color }) => color};
  background-color: ${({ bgColor }) => bgColor};
`;

const PriceInfo = styled.div`
  margin-top: 13px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
`;

const DiscountRate = styled.div`
  display: inline-block;
  font-size: 34px;
  color: #ff9b2f;
`;

const Price = styled.div`
  display: inline-block;
  margin-left: 10px;
  #salePrice {
    font-weight: bold;
    font-size: 20px;
  }
  #price {
    margin-top: 5px;
    font-size: 15px;
    color: #636363;
    text-decoration: line-through solid 1px;
  }
`;

const DescriptionContainer = styled.div`
  position: relative;
  margin: 15px 20px;
  padding-top: 15px;
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: center;
  border-top: 1px solid #d0d0d0;
`;

const Location = styled.div`
  font-size: 15px;
  > p {
    margin-top: 10px;
  }
`;
