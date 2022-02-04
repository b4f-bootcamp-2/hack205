import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Login.module.css";

const Login = () => {
  let navigate = useNavigate();

  const [login, setLogin] = useState({
    email: "",
    password: "",
  });
  const [visiblePassword, setVisiblePassword] = useState(false);
  const [error, setError] = useState({
    email: "",
    password: "",
  });

  const [erros, setErros] = useState({
    emptyEmail: "Please, insert your email address.",
    validEmail: "Please, insert a valid email.",
    emptyPassword: "Please, insert your password.",
    invalidPassword: "Invalid Password.",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => { }, [error]);

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
    if (login.email.length === 0 && (field === "email" || field === "")) {
      setError((prevState) => ({ ...prevState, email: erros.emptyEmail }));
      validForm = false;
    } else if (
      !validateEmail(login.email) &&
      login.email.length !== 0 &&
      (field === "email" || field === "")
    ) {
      setError((prevState) => ({ ...prevState, email: erros.validEmail }));
      validForm = false;
    }

    // Password errors
    if (login.password.length === 0 && (field === "password" || field === "")) {
      setError((prevState) => ({
        ...prevState,
        password: erros.emptyPassword,
      }));
      validForm = false;
    }
    return validForm;
  };

  const onChange = (e) => {
    setLogin({
      ...login,
      [e.target.name]: e.target.value,
    });
    validaForm(e.target.name);
  };

  const onLostFocus = (e) => {
    validaForm(e.target.name);
  };

  const onSubmit = async (e) => {
    if (e && e.preventDefault) { e.preventDefault(); }
    if (validaForm("")) {


      const logMeIn = await fetch("/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(login),
      });
      let ret = await logMeIn.json();

      setTimeout(() => {
        if (logMeIn.status === 200) {
          localStorage.setItem("token", ret.token);
          setLogin({
            email: "",
            password: "",
          });
          navigate("/collection");
        } else {
          setLoading(false);
          setError({
            email: erros.validEmail,
            password: erros.invalidPassword,
          });
        }
      }, 3000);
    }
  };


  return (
    <div className="hug">
      <form onSubmit={(e) => onSubmit(e)} className={styles.centerLogin}>
        <h1 className={styles.headerLogin}>Login</h1>
        <div className={styles.submitLine}>
          <input
            type="email"
            placeholder="Email"
            name="email"
            value={login.email}
            onChange={(e) => onChange(e)}
            onBlur={(e) => onLostFocus(e)}
            className={styles.inputInformation}
          />

          <span className={styles.msg}>{error.email}</span>
        </div>

        <div className={styles.submitLine}>
          <input
            type={visiblePassword === false ? "password" : "text"}
            placeholder="Password"
            name="password"
            value={login.password}
            onChange={(e) => onChange(e)}
            onBlur={(e) => onLostFocus(e)}
            className={styles.inputInformation}
          />

          <span className={styles.msg}>{error.password}</span>
        </div>
        <div className={styles.forgotPass}>
          <Link to="/forgotPassword" className={styles.link}>
            Forgot Password?
          </Link>
        </div>
        <button
          type="submit"
          onClick={() => onSubmit()}
          className={styles.btn}
          value="Send"
        // disabled={disabled} 
        >Submit</button>
      </form>
    </div>
  );

};

export default Login;
