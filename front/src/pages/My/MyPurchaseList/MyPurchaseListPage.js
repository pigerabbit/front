import styled from "styled-components";
const { default: TabBar } = require("components/TabBar");

const MyPurchaseListPage = () => {
  return (
    <Container>
      <TabBar />
    </Container>
  );
};

export default MyPurchaseListPage;

const Container = styled.div`
  position: relative;
  width: 100%;
  max-width: 770px;
  min-width: 360px;
  min-height: 100vh;
  background-color: #ffffff;
`;
