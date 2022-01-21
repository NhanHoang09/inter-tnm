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

  const setPasswordLength = (e) => {
    setPassGenerator({ ...passGenerator, length: e.target.value });
  };

  const handleUppercase = () => {
    setPassGenerator({ ...passGenerator, uppercase: !passGenerator.uppercase });
  };

  const handleLowercase = () => {
    setPassGenerator({ ...passGenerator, lowercase: !passGenerator.lowercase });
  };

  const handleNumbers = () => {
    setPassGenerator({ ...passGenerator, numbers: !passGenerator.numbers });
  };

  const handleSymbols = () => {
    setPassGenerator({ ...passGenerator, symbols: !passGenerator.symbols });
  };

  const generatePassword = (e) => {
    let listChars = "";
    let seedPassword = "";

    const creatPassword = (listChars) => {
      for (let i = 0; i < passGenerator.length - 4; i++) {
        let random = Math.floor(Math.random() * listChars.length);
        seedPassword += listChars[random];
      }
      console.log("create: " + seedPassword);
      return seedPassword;
    };

    e.preventDefault();

    if (passGenerator.uppercase) {
      const uppercaseChars= "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
      const random = Math.floor(Math.random() * uppercaseChars.length);
      listChars += uppercaseChars;
      seedPassword += uppercaseChars[random];
    }
    if (passGenerator.lowercase) {
      const lowercaseChars= "abcdefghijklmnopqrstuvwxyz";
      const random = Math.floor(Math.random() * lowercaseChars.length);
      listChars += lowercaseChars;
      seedPassword += lowercaseChars[random];
    }
    if (passGenerator.numbers) {
      const numbersChars= "0123456789";
      const random = Math.floor(Math.random() * numbersChars.length);
      listChars += numbersChars;
      seedPassword += numbersChars[random];
    }
    if (passGenerator.symbols) {
      const symbolsChars= "!@#$%^&*()";
      const random = Math.floor(Math.random() * symbolsChars.length);
      listChars += symbolsChars;
      seedPassword += symbolsChars[random];
      console.log("symbols char: "+seedPassword);

    }
    console.log("listChars: " + listChars);

    const newPass = creatPassword(listChars)
      .split("")
      .sort(function () {
        return 0.5 - Math.random();
      })
      .join("");

    console.log("newPass: " + newPass);
    console.log('seedPassword: '+seedPassword);


    setTextInput(newPass);
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
            onChange={setPasswordLength}
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
