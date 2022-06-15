import { useState } from "react";
import styled from "styled-components";
import { formatDate, headerTitle } from "../GroupModule";
import * as Api from "api";
import { useLocation } from "react-router-dom";
import GroupHeader from "../GroupHeader";
import AddressInfo from "./AddressInfo";
import ProductInfo from "./ProductInfo";
import PriceInfo from "./PriceInfo";
import PaymentInfo from "./PaymentInfo";

// const postOpenGroup = async () => {
//   try {
//     const deadline = formatDate(hour);
//     if (type === "coupon") {
//       setLocation(product.userInfo.buisness?.buisnessLocation);
//     }
//     const res = await Api.post(`groups`, {
//       groupType: type,
//       location,
//       productId: product.id,
//       state: 0,
//       groupName,
//       deadline,
//       quantity: count,
//     });
//     if (res.data.success) {
//       navigate("/purchaselist", { state: "success" });
//     }
//   } catch (err) {
//     console.log(err);
//   }
// };

const PaymentPage = () => {
  const loc = useLocation();
  const { from } = loc.state;

  const [payment, setPayment] = useState("");
  const [name, setName] = useState("김제로");
  const [contact, setContact] = useState("01012345678");
  const [address, setAddress] = useState("광진구 구의동 oo카페");

  return (
    <Container>
      <GroupHeader headerTitle="주문/결제" />
      <AddressInfo
        name={name}
        contact={contact}
        address={address}
        setName={setName}
        setContact={setContact}
        setAddress={setAddress}
      />
      <ProductInfo title="덴탈 마스크 함께 구매해요!" price={10000} count={3} />
      <PriceInfo price={10000} totalPrice={30000} shippingPrice={250} />
      <PaymentInfo setPayment={setPayment} />
      <ButtonContainer>
        <OrderButton>{30250}원 주문하기</OrderButton>
      </ButtonContainer>
    </Container>
  );
};

export default PaymentPage;

const Container = styled.div`
  position: relative;
  width: 100%;
  max-width: 770px;
  min-width: 360px;
  height: 100%;
  overflow: hidden;
`;

const ButtonContainer = styled.div`
  box-sizing: border-box;
  width: 100%;
  min-width: 300px;
  max-width: 700px;
  padding: 4.5%;
`;

const OrderButton = styled.button`
  position: fixed;
  box-sizing: border-box;
  width: 100%;
  min-width: 360px;
  max-width: 700px;
  background: #ffa849;
  color: #fff;
  bottom: 20px;
  border: none;
  padding: 1.5%;
  border-radius: 10px;
  font-size: 20px;
  @media (max-width: 500px) {
    width: 0;
    min-width: 340px;
    padding: 5%;
    font-size: 15px;
  }
`;
