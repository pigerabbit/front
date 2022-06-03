import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import GroupHeader from "../GroupHeader";
import OpenGroupBasicInfo from "./OpenGroupBasicInfo";
import OpenGroupDetailInfo from "./OpenGroupDetailInfo";

const headerTitle = {
  local: "지역 공구",
  normal: "택배 공구",
  pickup: "픽업 공구",
  ticket: "이용권 공구",
};

const OpenGroupPage = () => {
  const location = useLocation();

  const query = new URLSearchParams(location.search);
  const type = query.get("type");

  const params = useParams();
  const productId = params.id;

  const [product, setProduct] = useState({});

  const fetchProduct = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/products/${productId}`,
        {
          headers: {
            Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJiYmQ2YWU0NC00M2E2LTQ0MWYtODI1Ni1kMDJmZjI3ZmFkODQiLCJpYXQiOjE2NTQyMzIxMTZ9.5dtSBicHD486FYK-iDQkh48EmldfqoP6aMBO_dhlc1A `,
          },
        }
      );
      setProduct(res.data.payload.resultProduct);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchProduct();
  }, []);

  return (
    <Container>
      <GroupHeader headerTitle={headerTitle[type]} />
      <Content>
        {product && (
          <>
            <OpenGroupBasicInfo product={product} type={type} />
            <OpenGroupDetailInfo
              minCount={product.minPurchaseQty}
              maxCount={product.maxPurchaseQty}
              type={type}
            />
          </>
        )}
      </Content>
    </Container>
  );
};

export default OpenGroupPage;

const Container = styled.div`
  position: relative;
  width: 100%;
  max-width: 770px;
  min-width: 360px;
  min-height: 100vh;
  background-color: #ffffff;
  display: flex;
  justify-content: center;
  overflow: hidden;
`;

const Content = styled.div`
  margin-top: 70px;
  width: 100%;
  height: 100%;
  padding: 3%;
  box-sizing: border-box;
`;
