import { useState } from "react";
import FocusInput from "./components/FocusInput";
import ReactCodeInput from "react-verification-code-input";

function App() {
  return (
    <div className="container">
      <h1 className="title">Verify Your Account</h1>
      <p className="description">
        We emailed you the six digit code to cool_guy@email.com
        <br />
        Enter the code below to confirm your email address.
      </p>
      {/* <ReactCodeInput className="code" autoFocus={true} placeholder={[0,0,0,0,0,0]} /> */}
      <FocusInput length={6} />
      <p className="question">
        This is design only. We didn't actually send you an email as we don't
        have your email, right?
      </p>
    </div>
  );
}

export default App;
