import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import styled from "styled-components";

import GroupHeader from "../GroupHeader";
import { states, subDate, CalShippingFee } from "../GroupModule";
import AddressInfo from "./AddressInfo";
import ProductInfo from "./ProductInfo";
import PriceInfo from "./PriceInfo";
import * as Api from "api";

const PaymentDetailPage = () => {
  const params = useParams();
  const id = params.groupId;

  const { user } = useSelector((state) => state.user);

  const [group, setGroup] = useState(null);

  const fetchGroup = async () => {
    const res = await Api.get(`groups/groupId/${id}`);
    setGroup(res.data.payload[0]);
  };

  useEffect(() => {
    fetchGroup();
  }, []);

  if (group === null) {
    return "loading...";
  }

  return (
    <Container>
      <GroupHeader headerTitle={`주문/결제`} />
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
        contact="01012345678"
        address={group.groupType !== "normal" ? group.location : user?.address}
        type={group.groupType}
        isComplete="true"
      />
      <ProductInfo
        image={group.productInfo.images}
        title={group.groupName}
        price={group.productInfo.salePrice}
        count="2"
      />
      <PriceInfo
        price={group.productInfo.salePrice}
        totalPrice={group.productInfo.salePrice * 2}
        shippingPrice={CalShippingFee(
          group.groupType,
          group.productInfo.shippingFee,
          group.productInfo.shippingFeeCon,
          group.productInfo.salePrice,
          group.productInfo.salePrice * 2,
          group.productInfo.minPurchaseQty
        )}
        type={group.groupType}
        payment="카드 결제"
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
