import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import QRCode from "qrcode.react";

import GroupHeader from "pages/Group/GroupHeader";

const QRCodePage = ({}) => {
  const navigate = useNavigate();

  const checkurl = `http://localhost:3000/checkUser`;

  const handleClick = () => {
    try {
      navigate("/check");
    } catch (e) {
      console.log("이동 실패");
    }
  };
  return (
    <Container>
      <GroupHeader />
      <QRInfo>
        <p id="title">이용권 사용을 위한 QR코드입니다.</p>
        <p id="inform">
          이용권을 사용하실 구매처 사장님께 보여주세요! <br />본 이용권은 정해진
          기간 내에만 사용할 수 있으며, 기간 만료 시 포인트로 환불될 수 있음을
          알려드립니다.
        </p>
      </QRInfo>
      <QRContainer>
        <QRCode
          value={checkurl}
          level={"H"}
          id="qr"
          size={250}
          onClick={handleClick}
        />
      </QRContainer>
    </Container>
  );
};

export default QRCodePage;

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

  #title {
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 10px;
  }

  #inform {
    font-size: 16px;
    color: #636363;
  }
`;

const QRInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 80px;
  padding: 10px 30px;
`;

const QRContainer = styled.div`
  margin: 20px;
  padding: 50px;
  border: 4px solid #ffb564;
  border-radius: 10px;
`;
