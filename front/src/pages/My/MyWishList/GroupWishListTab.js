import styled from "styled-components";
import { FakegroupList } from "../MyMockData";
import MyWishListCard from "./MyWishListCard";

const GroupWishListTab = () => {
  return (
    <Container>
      <Count>
        총 <strong>{FakegroupList.length}</strong>개
      </Count>
      <GroupWishListWrapper>
        {FakegroupList.map((group) => (
          <MyWishListCard
            title={group.title}
            price={group.price}
            salePrice={group.salePrcie}
            discountRate={group.discountRate}
            leftParticipants={group.leftParticipants}
            deadline={group.deadline}
            contentPercent={["55%", "55%"]}
          />
        ))}
      </GroupWishListWrapper>
    </Container>
  );
};

export default GroupWishListTab;

const Container = styled.div`
  width: 100%;
  max-width: 770px;
  min-width: 360px;
  height: 100%;
  margin-top: 10px;
  overflow-y: scroll;
  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const Count = styled.p`
  margin: 2%;
`;

const GroupWishListWrapper = styled.div`
  width: 100%;
`;
