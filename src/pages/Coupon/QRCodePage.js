import React, { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import QRCode from "qrcode.react";
import * as Api from "api";

import DetailHeader from "components/DetailHeader";
import SetQuantityButtons from "components/SetQuantityButtons";
import LoadingSpinner from "components/LoadingSpinner";

const QRCodePage = () => {
  const { user } = useSelector((state) => state.user);

  const navigate = useNavigate();
  const location = useLocation();
  const { groupObjId } = location.state.data;

  const [checkUrl, setCheckUrl] = useState(
    "http://hackathon01.elicecoding.com/check"
  );
  const [maxQuantity, setMaxQuantity] = useState(1);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);

  // 테스트를 위해서 사용된 clickHandler 입니다.
  const handleClick = () => {
    try {
      navigate(
        `/check?group=${groupObjId}&user=${user.id}&quantity=${quantity}`
      );
    } catch (e) {
      console.log("이동 실패");
    }
  };

  const getMaxQuantity = async () => {
    try {
      const res = await Api.get(`payments/${groupObjId}/${user.id}`);
      const availableMaxQuantity = res.data.payload.voucher;
      if (availableMaxQuantity <= 0) {
        navigate("/check/result", { state: { success: false } });
      }
      setMaxQuantity(availableMaxQuantity);
      setLoading(false);
    } catch (e) {
      navigate("/check/result", { state: { success: false } });
    }
  };

  useEffect(() => {
    setLoading(true);
    if (user) {
      getMaxQuantity();
      setCheckUrl(
        `http://hackathon01.elicecoding.com/check?group=${groupObjId}&user=${user.id}&quantity=${quantity}`
      );
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      setCheckUrl(
        `http://hackathon01.elicecoding.com/check?group=${groupObjId}&user=${user.id}&quantity=${quantity}`
      );
    }
  }, [quantity]);

  return (
    <Container>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <>
          <DetailHeader />
          <QRInfo>
            <p id="title">이용권 사용을 위한 QR코드입니다.</p>
            <p id="inform">
              하단에 있는 상품 수량을 선택한 후, 이용권을 사용하실 구매처
              사장님께 보여주세요!
              <br />본 이용권은 정해진 기간 내에만 사용할 수 있으며, 기간 만료
              시 포인트로 환불될 수 있음을 알려드립니다.
            </p>
          </QRInfo>
          <QRContainer>
            <QRCode
              value={checkUrl}
              level={"H"}
              id="qr"
              size={250}
              // onClick={handleClick}
            />
          </QRContainer>
          <QRBottom>
            <h4>사용할 상품 수량</h4>
            <div id="quantity">
              <SetQuantityButtons
                quantity={quantity}
                setQuantity={setQuantity}
                maxQuantity={maxQuantity}
              />
              (남는 수량 {maxQuantity - quantity}개 / 최대 {maxQuantity}개)
            </div>
          </QRBottom>
        </>
      )}
    </Container>
  );
};

export default QRCodePage;

const popupAnimation = keyframes`
  from{
    transform: translateY(50%);
  }
  to{
    transform: none;
  }
`;

const Container = styled.div`
  position: relative;
  width: 770px;
  min-width: 360px;
  min-height: 100vh;
  height: 100vh;
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const QRInfo = styled.div`
  width: 90%;
  height: 80px;
  padding: 10px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  #title {
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 10px;
  }

  #inform {
    font-size: 16px;
    color: #636363;
    word-break: keep-all;
  }
`;

const QRContainer = styled.div`
  margin: 20px;
  padding: 50px;
  border: 4px solid #ffb564;
  border-radius: 10px;
`;

const QRBottom = styled.div`
  position: fixed;
  bottom: 0;
  z-index: 10;

  width: 100%;
  max-width: 770px;
  min-width: 360px;
  height: 15%;
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  border-radius: 10px 10px 0 0;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.15);

  animation: ${popupAnimation} 1s ease-in-out;

  > h4 {
    width: 90%;
    display: flex;
    justify-content: flex-start;
    margin-bottom: 10px;
  }

  #quantity {
    width: 90%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
`;
