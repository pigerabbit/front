import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import styled from "styled-components";
import * as Api from "api";

import { CalShippingFee } from "../GroupModule";
import GroupHeader from "../GroupHeader";
import AddressInfo from "./AddressInfo";
import PriceInfo from "./PriceInfo";
import ProductInfo from "./ProductInfo";
import PaymentInfo from "./PaymentInfo";

const JoinGroupPaymentPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { group, count } = location.state.data;

  const { user } = useSelector((state) => state.user);

  const [payment, setPayment] = useState("결제 수단 선택되지 않음");
  const [name, setName] = useState(user?.name || "");
  const [contact, setContact] = useState(
    user?.phoneNumber?.slice(0, 3) +
      "-" +
      user?.phoneNumber?.slice(3, 7) +
      "-" +
      user?.phoneNumber?.slice(7, 11) || ""
  );
  const [address, setAddress] = useState(
    group.type !== "normal" ? group.location : user?.address || ""
  );

  useEffect(() => {
    if (user) {
      setName(user.name);
      setContact(
        user.phoneNumber?.slice(0, 3) +
          "-" +
          user.phoneNumber?.slice(3, 7) +
          "-" +
          user.phoneNumber?.slice(7, 11)
      );
      if (group.groupType === "normal") {
        setAddress(user.address);
      }
    }
  }, [user, group]);

  const joinGroup = async () => {
    try {
      const res = await Api.put(`groups/${group.groupId}/participate/in`, {
        quantity: count,
        paymentMethod: payment,
      });
      if (res.data.success) {
        const { groupId } = res.data.payload;
        navigate(`/group/payment/${groupId}`);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const nameValid = name.length > 0;
  const contactValid = contact.length > 0;
  const addressValid = address.length > 0;
  const paymentValid = payment !== "결제 수단 선택되지 않음";
  const isValid = nameValid && contactValid && addressValid && paymentValid;

  const shippingPrice = CalShippingFee(
    group.groupType,
    group.productInfo.shippingFee,
    group.productInfo.shippingFeeCon,
    group.productInfo.salePrice,
    group.productInfo.salePrice * count,
    group.productInfo.minPurchaseQty
  );

  return (
    <Container>
      <GroupHeader headerTitle={`주문/결제`} goBack={-1} />
      <AddressInfo
        name={name}
        contact={contact}
        address={address}
        setName={setName}
        setContact={setContact}
        setAddress={setAddress}
        type={group.groupType}
      />
      <ProductInfo
        image={group.productInfo.images}
        title={group.groupName}
        price={group.productInfo.salePrice}
        count={count}
      />
      <PriceInfo
        price={group.productInfo.salePrice}
        totalPrice={group.productInfo.salePrice * count}
        shippingPrice={shippingPrice}
        type={group.groupType}
      />
      <PaymentInfo setPayment={setPayment} payment={payment} />
      <OrderButton disabled={!isValid} valid={isValid} onClick={joinGroup}>
        {`${(
          group.productInfo.salePrice * count +
          shippingPrice
        ).toLocaleString()}원 주문하기`}
      </OrderButton>
    </Container>
  );
};

export default JoinGroupPaymentPage;

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
