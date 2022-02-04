import React, { useState } from "react";




import styles from "./ForgotPassword.module.css";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  const [error, setError] = useState({
    email: "",
  });

  const [erros, setErros] = useState({
    emptyEmail: "Please, insert your email address.",
    validEmail: "Please, insert a valid email.",
  });

  const [success, setSuccess] = useState(false);

  function validateEmail(email) {
    const EMAIL_REGEX =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return EMAIL_REGEX.test(email);
  }

  const validaForm = (field) => {
    let validForm = true;
    setError({
      email: "",
      password: "",
    });

    // Email errors
    if (email.length === 0 && (field === "email" || field === "")) {
      setError((prevState) => ({ ...prevState, email: erros.emptyEmail }));
      validForm = false;
    } else if (
      !validateEmail(email) &&
      email.length !== 0 &&
      (field === "email" || field === "")
    ) {
      setError((prevState) => ({ ...prevState, email: erros.validEmail }));
      validForm = false;
    }
    return validForm;
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setSuccess(validaForm(""));
  }

  const onChange = (e) => {
    setEmail(e.target.value);
    validaForm(e.target.name);
  }

  if (success) {
    return <div className={styles.centerForgotPassword}>
      <div className={styles.notificationCheckout}>Check your e-mail and follow the steps.</div>
    </div>
  } else {
    return (
      <form onSubmit={(e) => onSubmit(e)} className={styles.centerForgotPassword}>
        <h1 className={styles.passwordHeader}>Forgot your password?</h1>
        <div className={styles.submitLine}>
          <input
            type="email"
            placeholder="Email"
            name="email"
            value={email}
            onChange={(e) => onChange(e)}
            className={styles.inputInformation}
          />
          <span className={styles.msgNotification}>{error.email}</span>
        </div>

        {/* <div className={styles.submitBtnPassword}>
          <InputButton value="Send" />
        </div> */}
      </form>
    )
  }
};

export default ForgotPassword;
