import { useLocation } from "react-router-dom";
import styled from "styled-components";
import GroupHeader from "../GroupHeader";
import OpenGroupBasicInfo from "./OpenGroupBasicInfo";
import OpenGroupDetailInfo from "./OpenGroupDetailInfo";
import { headerTitle } from "../GroupModule";

const OpenGroupPage = () => {
  const location = useLocation();

  const query = new URLSearchParams(location.search);
  const type = query.get("type");

  const product = location.state;

  return (
    <Container>
      <GroupHeader headerTitle={headerTitle[type]} />
      <Content>
        {product && (
          <>
            <OpenGroupBasicInfo product={product} type={type} />
            <OpenGroupDetailInfo product={product} type={type} />
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
