import React, { useState } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import encodeFileToBase64 from "utils/encodeFileToBase64";

const ProductInput = ({
  title,
  type,
  accept,
  value,
  setValue,
  valueValid,
  setPreviewImage,
  width,
  unit,
  check,
  handleClick,
}) => {
  const [fileValue, setFileValue] = useState("");

  const handleChange = (e) => {
    if (type === "file") {
      setFileValue(e.target.value);

      const img = e.target.files[0];
      if (!img) {
        setPreviewImage("");
        setValue("");
        return;
      }
      setValue(img);

      if (setPreviewImage) encodeFileToBase64(img, setPreviewImage);
    } else {
      setValue(e.target.value);
    }
  };

  return (
    <InputContainer width={width} type={type} onClick={handleClick}>
      <Title>{title}</Title>
      {type !== "textarea" ? (
        <Input
          width={width}
          type={type}
          accept={accept}
          value={type !== "file" ? value : fileValue}
          autoComplete="off"
          onChange={handleChange}
        />
      ) : (
        <Textarea
          rows="10"
          width={width}
          value={value}
          onChange={handleChange}
        />
      )}

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
  ${({ type }) => type !== "textarea" && "height: 7vw; max-height: 35px;"}
  font-size: 3vw;
  @media (min-width: 500px) {
    font-size: 15px;
  }
`;

const Title = styled.div`
  width: 29%;
  height: 7vw;
  max-height: 35px;
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

const Textarea = styled.textarea`
  padding: 8px 5px;
  width: ${({ width }) => width + "%;"};
  height: 100%;
  background-color: #fbfbfb;
  border: 1px solid #e6e6e6;
  box-sizing: border-box;
  font-size: 2.5vw;
  @media (min-width: 500px) {
    font-size: 13px;
  }
  resize: none;

  &:focus {
    outline: none;
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
  top: 1.6vw;
  @media (min-width: 500px) {
    top: 9px;
  }

  color: ${({ valid }) => {
    if (valid === "again") return "#FF6A6A;";
    else if (valid) return "#70BD86;";
    else return "#E9E9E9;";
  }};
  transition: color 0.4s;
`;
