import styled from "styled-components";
import MyPurchaseListCard from "./MyPurchaseListCard";
import * as Api from "api";

const CanceledListTab = ({ canceledData, setCanceledData, userId }) => {
  const handleRemoveGroupFromMyList = async (groupId) => {
    try {
      await Api.put(`groups/${groupId}/participate/out`);
      const data = canceledData.filter((data) => data.groupId !== groupId);
      setCanceledData(data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Container>
      <Count>
        총 <strong>{canceledData.length}</strong>개
      </Count>
      <PurchaseListContainer>
        <PurchaseListWrapper>
          {canceledData.length !== 0 &&
            canceledData.map((group) => (
              <MyPurchaseListCard
                key={group.groupId}
                userId={userId}
                group={group}
                isOpenTab={false}
                handleRemoveGroupFromMyList={handleRemoveGroupFromMyList}
              />
            ))}
        </PurchaseListWrapper>
      </PurchaseListContainer>
      {canceledData.length === 0 && (
        <NoPurchaseListContainer>
          <img
            src={`${process.env.PUBLIC_URL}/images/noProduct.svg`}
            alt="no openedPurchaseList"
          />
          공구 내역이 없습니다.
        </NoPurchaseListContainer>
      )}
    </Container>
  );
};

export default CanceledListTab;

const Container = styled.div`
  width: 100%;
  max-width: 770px;
  min-width: 360px;
  height: 100%;
  margin-top: 105px;
`;

const Count = styled.div`
  position: absolute;
  top: 80px;
  left: 20px;
`;

const PurchaseListContainer = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 113px;
  overflow-y: scroll;
  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const PurchaseListWrapper = styled.div`
  position: relative;
  padding-bottom: 300px;
`;

const NoPurchaseListContainer = styled.div`
  margin-top: 5%;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 25px;
  > img {
    width: 50%;
    margin-bottom: 5%;
  }
  @media only screen and (max-width: 500px) {
    margin-top: 25%;
  }
`;
