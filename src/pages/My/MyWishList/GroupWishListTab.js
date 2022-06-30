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
            id={group.groupId}
            title={group.groupName}
            images={group.productInfo.images}
            price={group.productInfo.price}
            salePrice={group.productInfo.salePrice}
            discountRate={group.productInfo.discountRate}
            leftParticipants={group.remainedPersonnel}
            deadline={group.deadline}
            isGroup
          />
        ))}
        {groups.length === 0 && (
          <NoWishListContainer>
            <img
              src={`${process.env.PUBLIC_URL}/images/noWishList.svg`}
              alt="no wishlist"
            />
            찜 내역이 없습니다.
          </NoWishListContainer>
        )}
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
  margin-top: 30px;
`;

const Count = styled.p`
  margin: 2%;
`;

const GroupWishListWrapper = styled.div`
  width: 100%;
`;

const NoWishListContainer = styled.div`
  margin-top: 10%;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 25px;
  > img {
    width: 50%;
    margin-bottom: 5%;
  }
  @media only screen and (max-width: 500px) {
    margin-top: 30%;
  }
`;
