import { useLocation } from "react-router-dom";
import styled from "styled-components";
import GroupHeader from "../GroupHeader";
import OpenGroupBasicInfo from "./OpenGroupBasicInfo";
import OpenGroupDetailInfo from "./OpenGroupDetailInfo";
import { headerTitle } from "../GroupModule";
import { useState } from "react";
import HourPopup from "./HourPopup";

const OpenGroupPage = () => {
  const [hour, setHour] = useState("");
  const [isHourPopup, setIsHourPopup] = useState(false);

  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const type = query.get("type");

  const product = location.state;

  return (
    <Container>
      <GroupHeader headerTitle={headerTitle[type]} goBack={-1} />
      {isHourPopup && (
        <HourPopup setIsHourPopup={setIsHourPopup} setHour={setHour} />
      )}
      {product && (
        <>
          <OpenGroupBasicInfo product={product} type={type} />
          <OpenGroupDetailInfo
            product={product}
            type={type}
            hour={hour}
            setHour={setHour}
            setIsHourPopup={setIsHourPopup}
          />
        </>
      )}
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
  background-color: #f6f6f6;
  overflow: hidden;
`;
