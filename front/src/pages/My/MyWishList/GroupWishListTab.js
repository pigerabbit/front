import styled from "styled-components";
import MyWishListCard from "./MyWishListCard";

const GroupWishListTab = ({ groups }) => {
  return (
    <Container>
      <Count>
        총 <strong>{groups.length}</strong>개
      </Count>
      <GroupWishListWrapper>
        {groups.map((group) => (
          <MyWishListCard
            key={group.groupId}
            title={group.groupName}
            images={group.productInfo.images}
            price={group.productInfo.price}
            salePrice={group.productInfo.salePrice}
            discountRate={group.productInfo.discountRate}
            leftParticipants={group.remainedPeronnel}
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
