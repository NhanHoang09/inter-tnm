import React, { useState, useRef } from "react";
import styled from "styled-components";

const InputContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 8px;
  width: 100%;
  input {
    border-radius: 5px;
    font-size: 75px;
    height: 120px;
    width: 100px;
    border: 1px solid #000;
    margin: 1%;
    text-align: center;
    font-weight: 300;

    ::placeholder {
      color: #000;
      font-size: 6rem;
      text-align: center;
    }
    :valid {
      border-color: #3498db;
      box-shadow: 0 10px 10px -5px rgb(0 0 0 / 25%);
    }
  }
`;

function FocusInput({ length, onComplete }) {
  const [code, setCode] = useState([...Array(length)].map(() => ""));
  const inputRef = useRef([]);

  console.log(code);

  const processInput = (e, slot) => {
    const num = e.target.value;
    if (/[^0-9]/.test(num)) return;
    const newCode = [...code];
    newCode[slot] = num;
    setCode(newCode);
    if (slot !== length - 1) {
      inputRef.current[slot + 1].focus();
    }
  };

  const onKeyDown = (e, slot) => {
    if (e.key === "Backspace") {
      const newCode = [...code];
      newCode[slot - 1] = "";
      setCode(newCode);
      inputRef.current[slot - 1].focus();
    }
  };

  return (
    <InputContainer>
      {code.map((num, index) => (
        <input
          key={index}
          maxLength={1}
          inputMode="numeric"
          value={num}
          autoFocus={index === 0}
          onKeyDown={(e) => onKeyDown(e, index)}
          onChange={(e) => processInput(e, index)}
          ref={(ref) => inputRef.current.push(ref)}
          placeholder={0}
        />
      ))}
    </InputContainer>
  );
}

export default FocusInput;
