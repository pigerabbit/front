import { formatDate, headerTitle } from "../GroupModule";
import * as Api from "api";
import styled from "styled-components";
import { useLocation } from "react-router-dom";
import GroupHeader from "../GroupHeader";
import AddressInfo from "./AddressInfo";

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

  return (
    <Container>
      <GroupHeader headerTitle="주문/결제" />
      <AddressInfo
        name="배서영"
        contact="01012345678"
        address="광진구 구의동"
      />
    </Container>
  );
};

export default PaymentPage;

const Container = styled.div`
  position: relative;
  width: 100%;
  max-width: 770px;
  min-width: 360px;
  min-height: 100vh;
  overflow: hidden;
`;
