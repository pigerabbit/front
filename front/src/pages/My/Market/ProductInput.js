import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";

const ProductInput = ({
  title,
  type,
  accept,
  value,
  setValue,
  valueValid,
  setImage,
  width,
  unit,
  check,
}) => {
  const encodeFileToBase64 = (fileBlob) => {
    try {
      const reader = new FileReader();
      reader.readAsDataURL(fileBlob);
      return new Promise((resolve) => {
        reader.onload = () => {
          setImage(reader.result);

          resolve();
        };
      });
    } catch (e) {
      console.log("preview 생성 실패");
    }
  };

  return (
    <InputContainer width={width}>
      <Title>{title}</Title>
      <Input
        width={width}
        type={type}
        accept={accept}
        value={value}
        autoComplete="off"
        onChange={(e) => {
          if (type === "file") {
            const img = e.target.files;
            setValue(img);

            if (setImage) encodeFileToBase64(img[0]);
          }
          setValue(e.target.value);
        }}
      />

      {unit && <Unit>{unit}</Unit>}

      {check && (
        <CheckIcon valid={valueValid} width={width}>
          <FontAwesomeIcon icon={faCircleCheck} />
        </CheckIcon>
      )}
    </InputContainer>
  );
};

export default ProductInput;

const InputContainer = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  justify-content: flex-start;
  margin-bottom: 10px;
  height: 7vw;
  max-height: 35px;
  font-size: 3vw;
  @media (min-width: 500px) {
    font-size: 15px;
  }
`;

const Title = styled.div`
  width: 29%;
  height: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const Input = styled.input`
  padding: 5px;
  width: ${({ width }) => width + "%;"};
  background-color: #fbfbfb;
  border: 1px solid #e6e6e6;
  box-sizing: border-box;
  font-size: 2.5vw;
  @media (min-width: 500px) {
    font-size: 13px;
  }

  &:focus {
    outline: none;
  }

  &::-webkit-inner-spin-button {
    appearance: none;
    -moz-appearance: none;
    -webkit-appearance: none;
  }
`;

const Unit = styled.span`
  margin-left: 10px;
  display: flex;
  align-items: center;
`;

const CheckIcon = styled.div`
  position: absolute;
  left: -22px;
  top: 25%;

  color: ${({ valid }) => {
    if (valid === "again") return "#FF6A6A;";
    else if (valid) return "#70BD86;";
    else return "#E9E9E9;";
  }};
  transition: color 0.4s;
`;
