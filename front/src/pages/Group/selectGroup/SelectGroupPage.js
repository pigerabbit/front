import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import GroupHeader from "../GroupHeader";
import SelectGroupTypes from "./SelectGroupTypes";
import SelectGroupPopUpCard from "./SelectGroupPopUpCard";
import { faAngleUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as Api from "api";

const SelectGroupPage = () => {
  //const location = useLocation();
  //const type = location.state;
  const type = "normal";

  const params = useParams();
  const productId = params.id;

  const [isOpen, setIsOpen] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [product, setProduct] = useState({});

  const handleClick = () => {
    if (!isChecked) {
      setIsOpen(true);
    } else {
      setIsChecked(false);
    }
  };

  const fetchProduct = async () => {
    try {
      const res = await Api.get(`products/${productId}`);
      console.log(res.data);
      setProduct(res.data.payload);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchProduct();
  }, []);

  return (
    <Container>
      <GroupHeader headerTitle="공구 열기" />
      <PleaseNoteContainer>
        <p>
          공구를 열기 전 <span>공구 주의사항</span>을 읽어주시길 바랍니다.
          <br />
          사전에 고지된 주의사항을 읽지 않고 공구를 열 경우, 책임은 본인에게
          있습니다.
        </p>
        <ConfirmButton>
          <input
            type="checkbox"
            name="confirm"
            checked={isChecked}
            onClick={() => handleClick()}
          />
          <span>확인했습니다</span>
        </ConfirmButton>
      </PleaseNoteContainer>
      <SelectGroupTypes type={type} product={product} isChecked={isChecked} />
      <PleaseNoteDetail>
        <FontAwesomeIcon
          icon={faAngleUp}
          onClick={() => setIsOpen(true)}
          style={{ fontSize: "40px" }}
        />
        <p>공구 주의사항 펼쳐보기</p>
      </PleaseNoteDetail>
      {isOpen && (
        <SelectGroupPopUpCard
          setIsOpen={setIsOpen}
          setIsChecked={setIsChecked}
        />
      )}
    </Container>
  );
};

export default SelectGroupPage;

const Container = styled.div`
  position: relative;
  width: 100%;
  max-width: 770px;
  min-width: 360px;
  min-height: 100vh;
  background-color: #ffffff;
  overflow-x: hidden;
  overflow-y: scroll;
  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const PleaseNoteContainer = styled.div`
  margin-top: 60px;
  margin-left: 5%;
  padding: 3% 5%;
  font-size: 18px;
  line-height: 25px;
  > p {
    width: 100%;
    font-weight: bold;
    > span {
      color: #ff0000;
      font-weight: bold;
    }
  }
  @media (max-width: 500px) {
    font-size: 15px;
    padding: 3% 5%;
  }
`;

const ConfirmButton = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-right: 3%;
  > input[type="checkbox"] {
    width: 18px;
    height: 18px;
  }
  > span {
    display: inline-block;
    padding-top: 2px;
    margin-left: 3px;
  }
`;

const PleaseNoteDetail = styled.div`
  background: #ffc07d;
  border-radius: 10px 10px 0 0;
  width: 100%;
  max-width: 770px;
  min-width: 360px;
  height: 20%;
  position: fixed;
  z-index: 5;
  bottom: 0;
  text-align: center;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.25);
  > p {
    font-size: 25px;
    font-weight: bold;
    @media (max-width: 500px) {
      font-size: 20px;
    }
  }
`;
