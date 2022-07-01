import styled from "styled-components";
import MyWishListCard from "./MyWishListCard";

const GroupWishListTab = ({ groups }) => {
  return (
    <Container>
      <CountWrapper>
        <Count>
          총 <strong>{groups.length}</strong>개
        </Count>
      </CountWrapper>
      <GroupWishListContainer>
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
        </GroupWishListWrapper>
      </GroupWishListContainer>
      {groups.length === 0 && (
        <NoWishListContainer>
          <img
            src={`${process.env.PUBLIC_URL}/images/noWishList.svg`}
            alt="no wishlist"
          />
          찜 내역이 없습니다.
        </NoWishListContainer>
      )}
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

const CountWrapper = styled.div`
  position: absolute;
  top: 70px;
  padding: 1% 2%;
`;

const Count = styled.p`
  width: 100%;
  margin: 2%;
`;

const GroupWishListContainer = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 100px;
  overflow-y: scroll;
  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const GroupWishListWrapper = styled.div`
  position: relative;
  padding-bottom: 300px;
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
