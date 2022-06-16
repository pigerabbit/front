import { useState } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";

import { formatDate, headerTitle, CalShippingFee } from "../GroupModule";
import * as Api from "api";
import { useLocation, useNavigate } from "react-router-dom";
import GroupHeader from "../GroupHeader";
import AddressInfo from "./AddressInfo";
import ProductInfo from "./ProductInfo";
import PriceInfo from "./PriceInfo";
import PaymentInfo from "./PaymentInfo";

const OpenGroupPaymentPage = () => {
  const navigate = useNavigate();
  const loc = useLocation();
  const { product, type, groupName, location, count, hour } = loc.state.data;

  const { user } = useSelector((state) => state.user);

  const [payment, setPayment] = useState("결제 수단 선택되지 않음");
  const [name, setName] = useState(user?.name);
  const [contact, setContact] = useState("");
  const [address, setAddress] = useState(
    type !== "normal" ? location : user?.address
  );

  const postOpenGroup = async () => {
    try {
      const deadline = formatDate(hour);
      const res = await Api.post(`groups`, {
        groupType: type,
        location: address,
        productId: product.id,
        state: 0,
        groupName,
        deadline,
        quantity: count,
      });
      if (res.data.success) {
        navigate(`/group/payment/${res.data.payload.groupId}`);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const nameValid = name?.length > 0;
  const contactValid = contact.length > 0;
  const addressValid = address.length > 0;
  const paymentValid = payment !== "결제 수단 선택되지 않음";

  const isValid = nameValid && contactValid && addressValid && paymentValid;

  return (
    <Container>
      <GroupHeader headerTitle={`주문/결제(${headerTitle[type]})`} />
      <AddressInfo
        name={name}
        contact={contact}
        address={address}
        setName={setName}
        setContact={setContact}
        setAddress={setAddress}
        type={type}
      />
      <ProductInfo
        image={product.images}
        title={groupName}
        price={product.salePrice}
        count={count}
      />
      <PriceInfo
        price={product.salePrice}
        totalPrice={product.salePrice * count}
        shippingPrice={CalShippingFee(
          type,
          product.shippingFee,
          product.shippingFeeCon,
          product.salePrice,
          product.salePrice * count,
          product.minPurchaseQty
        )}
        type={type}
      />
      <PaymentInfo setPayment={setPayment} payment={payment} />
      <OrderButton
        disabled={!isValid}
        valid={isValid}
        onClick={() => postOpenGroup()}
      >
        {30250}원 주문하기
      </OrderButton>
    </Container>
  );
};

export default OpenGroupPaymentPage;

const Container = styled.div`
  position: relative;
  width: 100%;
  max-width: 770px;
  min-width: 360px;
  height: 100%;
  overflow: hidden;
`;

const OrderButton = styled.button`
  position: fixed;
  box-sizing: border-box;
  width: 100%;
  min-width: 360px;
  max-width: 770px;
  background: #ffa849;
  color: #fff;
  bottom: 0px;
  border: none;
  padding: 1.5%;
  font-size: 20px;
  cursor: ${(props) => (props.valid ? "pointer" : "")};
  background-color: ${(props) => (props.valid ? "#FFB564" : "#D0D0D0")};
  @media (max-width: 500px) {
    padding: 3% 1.5%;
    font-size: 15px;
  }
`;
