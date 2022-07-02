import { useNavigate } from "react-router-dom";
import { faUser, faHome } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";

const GroupHeader = ({ headerTitle, goBack }) => {
  const navigate = useNavigate();

  const handlePreviousBtnClick = () => {
    navigate(goBack, { replace: true });
  };

  return (
    <Header>
      <GoBack
        onClick={handlePreviousBtnClick}
        nonDisplay={headerTitle === "결제 완료"}
      />
      <Title nonDisplay={headerTitle === "결제 완료"}>{headerTitle}</Title>
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

export default GroupHeader;

const Header = styled.header`
  position: fixed;
  width: 100%;
  min-width: 360px;
  max-width: 770px;
  top: 0;
  z-index: 5;
  background-color: #ffffff;
  height: 60px;
`;

const GoBack = styled.i`
  border: solid black;
  border-width: 0 1.5px 1.5px 0;
  display: ${(props) => (props.nonDisplay ? "none" : "inline-block")};
  padding: 5px;
  margin: 20px 0 0 20px;
  transform: rotate(135deg);
  -webkit-transform: rotate(135deg);
  cursor: pointer;
`;

const Title = styled.p`
  display: inline-block;
  margin-left: ${(props) => (props.nonDisplay ? "26%" : "23%")};
  font-size: 25px;
  font-weight: bold;
  width: 350px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  padding: 20px 0;
  vertical-align: middle;
  text-align: center;
  @media (max-width: 510px) {
    margin-left: 5%;
    font-size: 20px;
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
