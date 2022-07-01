import { useNavigate } from "react-router-dom";
import { faUser, faHome } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";

const DetailHeader = ({ headerTitle }) => {
  const navigate = useNavigate();
  return (
    <Header>
      <GoBack onClick={() => navigate(-1)} />
      {headerTitle && <Title>{headerTitle}</Title>}
      <ButtonTopContainer>
        <div
          id="home"
          onClick={() => {
            navigate("/");
          }}
        >
          <FontAwesomeIcon
            icon={faHome}
            style={{ fontSize: "20px", color: "#f79831" }}
          />
        </div>
        <div
          id="user"
          onClick={() => {
            navigate("/mypage");
          }}
        >
          <FontAwesomeIcon
            icon={faUser}
            style={{ fontSize: "20px", color: "#f79831" }}
          />
        </div>
      </ButtonTopContainer>
    </Header>
  );
};

export default DetailHeader;

const Header = styled.header`
  position: fixed;
  width: 100%;
  min-width: 360px;
  max-width: 770px;
  top: 0;
  z-index: 5;
  background-color: #ffffff;
  height: 50px;
`;

const GoBack = styled.i`
  border: solid black;
  border-width: 0 1.5px 1.5px 0;
  display: inline-block;
  padding: 5px;
  margin: 20px 0 0 20px;
  transform: rotate(135deg);
  -webkit-transform: rotate(135deg);
  cursor: pointer;
`;

const Title = styled.p`
  margin-left: 10px;
  display: inline-block;
  width: 400px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  vertical-align: middle;
  transform: translateY(-1.7px);

  @media (max-width: 500px) {
    width: 270px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`;

const ButtonTopContainer = styled.div`
  width: 60px;
  position: absolute;
  top: 18px;
  right: 20px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  #home,
  #user {
    cursor: pointer;
  }
`;
