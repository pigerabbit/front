import styled from "styled-components";

const AddressInfo = ({ name, contact, address }) => {
  return (
    <Container>
      <h3>배송지 정보</h3>
      <Content>
        <Info>
          <h3>받는 사람</h3>
          <input type="text" value={name} />
        </Info>
        <Info>
          <h3>연락처</h3>
          <input type="text" value={contact} />
        </Info>
        <Info>
          <h3>공구주소</h3>
          <input
            type="text"
            value={address}
            disabled
            style={{ color: "#939393" }}
          />
        </Info>
      </Content>
    </Container>
  );
};

export default AddressInfo;

const Container = styled.div`
  position: relative;
  box-sizing: border-box;
  width: 100%;
  height: 29%;
  background: #fff;
  margin-top: 70px;
  padding: 3%;
`;

const Content = styled.div`
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  padding: 2%;
`;

const Info = styled.div`
  > h3 {
    font-size: 15px;
    margin-bottom: 1%;
  }
  > input[type="text"] {
    width: 100%;
    font-size: 15px;
    border: 1px solid #e6e6e6;
    background: #fbfbfb;
    padding: 5px;
  }
  margin-bottom: 3%;
`;
