import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import * as Api from "api";

import { states, subDate, CalShippingFee } from "../GroupModule";
import GroupHeader from "../GroupHeader";
import AddressInfo from "./AddressInfo";
import ProductInfo from "./ProductInfo";
import PriceInfo from "./PriceInfo";
import LoadingSpinner from "components/LoadingSpinner";

const PaymentDetailPage = () => {
  const params = useParams();
  const id = params.groupId;

  const { user } = useSelector((state) => state.user);

  const [group, setGroup] = useState([]);

  const getGroup = async () => {
    const res = await Api.get(`groups/groupId/${id}`);
    setGroup(res.data.payload[0]);
  };

  useEffect(() => {
    getGroup();
  }, []);

  if (group.length === 0) {
    return <LoadingSpinner />;
  }

  const {
    payment: { paymentMethod },
    quantity,
  } = group.participants.filter((p) => p.userId === user.id)[0];

  return (
    <Container>
      <GroupHeader headerTitle={`결제 완료`} />
      <Info>
        <Message>
          <span>{subDate(group.updatedAt)}</span>
          <h3>주문이 완료되었습니다!</h3>
        </Message>
        <State color={states[group.state][2]} bgColor={states[group.state][1]}>
          <span>{states[group.state][0]}</span>
        </State>
      </Info>
      <AddressInfo
        name={user?.name}
        contact={
          user?.phoneNumber?.slice(0, 3) +
          "-" +
          user?.phoneNumber?.slice(3, 7) +
          "-" +
          user?.phoneNumber?.slice(7, 11)
        }
        address={group.groupType !== "normal" ? group.location : user?.address}
        type={group.groupType}
        isComplete="true"
      />
      <ProductInfo
        image={group.productInfo.images}
        title={group.groupName}
        price={group.productInfo.salePrice}
        count={quantity}
      />
      <PriceInfo
        price={group.productInfo.salePrice}
        totalPrice={group.productInfo.salePrice * quantity}
        shippingPrice={CalShippingFee(
          group.groupType,
          group.productInfo.shippingFee,
          group.productInfo.shippingFeeCon,
          group.productInfo.salePrice,
          group.productInfo.salePrice * quantity,
          group.productInfo.minPurchaseQty
        )}
        type={group.groupType}
        payment={paymentMethod}
      />
    </Container>
  );
};

export default PaymentDetailPage;

const Container = styled.div`
  position: relative;
  width: 100%;
  max-width: 770px;
  min-width: 360px;
  height: 100%;
  overflow: hidden;
`;

const Info = styled.div`
  position: relative;
  box-sizing: border-box;
  width: 100%;
  height: 10%;
  background: #fff;
  margin-top: 70px;
  padding: 3%;
  display: flex;
  justify-content: space-between;
`;

const Message = styled.div`
  width: 80%;
  > h3 {
    margin-left: 3%;
    display: inline;
    color: #f79831;
  }
`;

const State = styled.div`
  width: 20%;
  text-align: right;
  > span {
    padding: 5% 20%;
    border-radius: 5px;
    font-size: 15px;
    color: ${(props) => props.color};
    background: ${(props) => props.bgColor};
  }
`;
