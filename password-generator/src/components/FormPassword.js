import React, { useState } from "react";
import { FaClipboard } from "react-icons/fa";
import { FaClipboardCheck } from "react-icons/fa";

function FormPassword() {
  const [textInput, setTextInput] = useState("");
  const [copiedTextInput, setCopiedTextInput] = useState(false);
  const [passGenerator, setPassGenerator] = useState({
    length: 4,
    uppercase: true,
    lowercase: true,
    numbers: true,
    symbols: true,
  });

  const handleLengthPass = (e) => {
    setPassGenerator({
      ...passGenerator,
      length: e.target.value,
    });
  };

  const handleUppercase = (e) => {
    setPassGenerator({
      ...passGenerator,
      uppercase: !passGenerator.uppercase,
    });
  };
  const handleLowercase = (e) => {
    setPassGenerator({
      ...passGenerator,
      lowercase: !passGenerator.lowercase,
    });
  };

  const handleNumbers = (e) => {
    setPassGenerator({
      ...passGenerator,
      numbers: !passGenerator.numbers,
    });
  };

  const handleSymbols = (e) => {
    setPassGenerator({
      ...passGenerator,
      symbols: !passGenerator.symbols,
    });
  };

  const generatePassword = (e) => {
    let seedPassword = "";

    e.preventDefault();
    if(passGenerator.length < 4) {
      alert('please enter a number greater than 4');
    }
    if(!passGenerator.uppercase && !passGenerator.lowercase && !passGenerator.numbers && !passGenerator.symbols) {
      alert('please select at least one character type');
    }

    if (passGenerator.uppercase) {
      const uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
      const random = Math.floor(Math.random() * uppercaseChars.length);
      seedPassword += uppercaseChars[random];
    }
    if (passGenerator.lowercase) {
      const lowercaseChars = "abcdefghijklmnopqrstuvwxyz";
      const random = Math.floor(Math.random() * lowercaseChars.length);
      seedPassword += lowercaseChars[random];
    }
    if (passGenerator.numbers) {
      const numbersChars = "0123456789";
      const random = Math.floor(Math.random() * numbersChars.length);
      seedPassword += numbersChars[random];
    }
    if (passGenerator.symbols) {
      const symbolsChars = "!@#$%^&*()";
      const random = Math.floor(Math.random() * symbolsChars.length);
      seedPassword += symbolsChars[random];
      console.log("symbols char: " + seedPassword);
    }

    const creatPassword = (listChars) => {

      if (passGenerator.length === 4) {
        for (let i = 0; i < passGenerator.length; i++) {
          return listChars;
        }
      }
      if (passGenerator.length > 4) {
        let newPass = "";
        for (let i = 0; i < passGenerator.length; i++) {

          let random = Math.floor(Math.random() * listChars.length);
          newPass += listChars[random];
        }
        return newPass;

      }

    };

    setTextInput(creatPassword(seedPassword));
  };

  const handleClipboard = () => {
    navigator.clipboard.writeText(textInput);
    setCopiedTextInput(true);
    alert("Password Copied to clipboard");
    setTimeout(() => {
      setCopiedTextInput(false);
    }, 5000);
  };

  return (
    <div className="container">
      <h2>Password Generator</h2>
      <div className="result-container">
        <input value={textInput} />
        <button className="btn" id="clipboard" onClick={handleClipboard}>
          {copiedTextInput ? <FaClipboardCheck /> : <FaClipboard />}
        </button>
      </div>
      <div className="settings">
        <div className="setting">
          <label>Password Length</label>
          <input
            type="number"
            id="length"
            min="4"
            max="20"
            value={passGenerator.length}
            onChange={handleLengthPass}
          />
        </div>
        <div className="setting">
          <label>Include uppercase letters</label>
          <input
            type="checkbox"
            id="uppercase"
            checked={passGenerator.uppercase}
            onChange={handleUppercase}
          />
        </div>
        <div className="setting">
          <label>Include lowercase letters</label>
          <input
            type="checkbox"
            id="lowercase"
            checked={passGenerator.lowercase}
            onChange={handleLowercase}
          />
        </div>
        <div className="setting">
          <label>Include numbers</label>
          <input
            type="checkbox"
            id="numbers"
            checked={passGenerator.numbers}
            onChange={handleNumbers}
          />
        </div>
        <div className="setting">
          <label>Include symbols</label>
          <input
            type="checkbox"
            id="symbols"
            checked={passGenerator.symbols}
            onChange={handleSymbols}
          />
        </div>
      </div>
      <button
        className="btn btn-large"
        id="generate"
        onClick={generatePassword}
      >
        Generate Password
      </button>
    </div>
  );
}

export default FormPassword;
