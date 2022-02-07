import React, { useState, useEffect } from "react";

function RegisterForm() {
  const [formValues, setFormValues] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmit(true);
  };

  const validate = (values) => {
    const errors = {};
    const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!values.username) {
      errors.username = "Username is required!";
    }
    if (!values.email) {
      errors.email = "Email is required!";
    } else if (!validEmail.test(values.email)) {
      errors.email = "This is not a valid email format!";
    }
    if (!values.password) {
      errors.password = "Password is required";
    } else if (values.password.length < 5) {
      errors.password = "Password must be more than 5 characters";
    } else if (values.password.length > 15) {
      errors.password = "Password cannot exceed more than 15 characters";
    }

    if (!values.confirmPassword) {
      errors.confirmPassword = "Confirm Password is required";
    } else if (values.confirmPassword !== values.password) {
      errors.confirmPassword = "Password does not match";
    }


    return errors;
  };

  return (
    <div className="form-container">
      {Object.keys(formErrors).length === 0 && isSubmit ? (
        <div className="success-message">Signed in successfully</div>
      ) : null}

      <form className="register-form " onSubmit={handleSubmit}>
        <h1>Login Form</h1>

        <input
          className="form-field"
          type="text"
          name="username"
          placeholder="Username"
          value={formValues.username}
          onChange={handleChange}
        />

        <span id="first-name-error">{formErrors.username}</span>

        <input
          className="form-field"
          type="text"
          name="email"
          placeholder="Email"
          value={formValues.email}
          onChange={handleChange}
        />
        <span id="first-name-error">{formErrors.email}</span>

        <input
          className="form-field"
          type="password"
          name="password"
          placeholder="Password"
          value={formValues.password}
          onChange={handleChange}
        />

        <span id="first-name-error">{formErrors.password}</span>

        <input
          className="form-field"
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={formValues.ConfirmPassword}
          onChange={handleChange}
        />

        <span id="first-name-error">{formErrors.confirmPassword}</span>


        <button className="form-field">Submit</button>
      </form>
    </div>
  );
}

export default RegisterForm;
