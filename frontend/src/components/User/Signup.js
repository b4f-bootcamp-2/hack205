import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Signup.module.css";

const SignUp = () => {
    let navigate = useNavigate();

    const [visiblePassword, setVisiblePassword] = useState(false);
    const [visiblePasswordConfirmation, setVisiblePasswordConfirmation] =
        useState(false);
    const [signUp, setSignUp] = useState({
        name: "",
        email: "",
        password: "",
        passwordConfirmation: "",
        acceptsTerms: false,
        pomodoro: [],
        totalHours: []
    });

    const [error, setError] = useState({
        name: "",
        email: "",
        password: "",
        acceptsTerms: "",
    });

    const [fail, setFail] = useState("");


    const [erros, setErros] = useState({
        name:
            "Please insert your name",
        emptyEmail:
            "Please insert your email address.",
        validEmail:
            "Please insert a valid email.",
        //     emailAlreadyExists: "This email already exists.",
        emptyPassword:
            "Please insert your password.",
        passwordConfirmationDifferent:
            "The passwords don't match.",
        passwordConfirmationRepeat:
            "Please insert your password again.",
        weakPassword:
            "Your password needs to be at least 8 characters.",
        shortPassword:
            "Your password need to have at least one number, one lowercase word, one uppercase word and a symbol.",
        acceptsTerms:
            "You need to accept our conditions terms to create your account.",
        fail:
            "Fail to create user.",
    });

    useEffect(() => { }, [error]);

    function validateEmail(email) {
        const EMAIL_REGEX =
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return EMAIL_REGEX.test(email);
    }

    function checkPasswordStrength(password) {
        if (password.length < 8) return 0;
        const regexes = [/[a-z]/, /[A-Z]/, /[0-9]/, /[~!@#$%^&*)(+=._-]/];
        return regexes
            .map((re) => re.test(password))
            .reduce((score, t) => (t ? score + 1 : score), 0);
    }

    const onChange = (e) => {
        let value;
        if (e.target.type === "checkbox") {
            value = e.target.checked;
        } else {
            value = e.target.value;
        }
        setSignUp({ ...signUp, [e.target.name]: value });
        validaForm();
    };

    const onLostFocus = (e) => {
        validaForm(e.target.name);
    };

    const validaForm = (field) => {
        let validForm = true;
        setError({
            name: "",
            email: "",
            password: "",
            acceptsTerms: "",
        });

        // Name error
        if (signUp.name.length === 0 && (field === "name" || field === "")) {
            setError((prevState) => ({ ...prevState, name: erros.name }));
            validForm = false;
        }


        // Email errors
        if (signUp.email.length === 0 && (field === "email" || field === "")) {
            setError((prevState) => ({ ...prevState, email: erros.emptyEmail }));
            validForm = false;
        } else if (!validateEmail(signUp.email) && signUp.email.length !== 0 && (field === "email" || field === "")) {
            setError((prevState) => ({ ...prevState, email: erros.validEmail }));
            validForm = false;
        }

        // Password errors
        if (signUp.password.length === 0 && (field === "password" || field === "")) {
            setError((prevState) => ({
                ...prevState,
                password: erros.emptyPassword,
            }));
            validForm = false;
        } else if (
            checkPasswordStrength(signUp.password) === 0 &&
            signUp.password.length !== 0 && (field === "password" || field === "")) {
            setError((prevState) => ({ ...prevState, password: erros.weakPassword }));
            validForm = false;
        } else if (
            checkPasswordStrength(signUp.password) < 4 &&
            checkPasswordStrength(signUp.password) > 0 && (field === "password" || field === "")) {
            setError((prevState) => ({
                ...prevState,
                password: erros.shortPassword,
            }));
            validForm = false;
        }

        // Erros de Password Confirmation
        if (signUp.passwordConfirmation.length === 0 && (field === "passwordConfirmation" || field === "")) {
            setError((prevState) => ({
                ...prevState,
                passwordConfirmation: erros.passwordConfirmationRepeat,
            }));
            validForm = false;
        } else if (
            signUp.password !== signUp.passwordConfirmation &&
            signUp.passwordConfirmation.length !== 0 && (field === "passwordConfirmation" || field === "")) {
            setError((prevState) => ({
                ...prevState,
                password: erros.passwordConfirmationDifferent,
            }));
            validForm = false;
        }

        // Erros de Accept Terms
        if (!signUp.acceptsTerms && (field === "acceptsTerms" || field === "")) {
            setError((prevState) => ({
                ...prevState,
                acceptsTerms: erros.acceptsTerms,
            }));
            validForm = false;
        }


        return validForm;
    };

    const onSubmit = async (e) => {
        if (e && e.preventDefault) { e.preventDefault(); }
        // e.preventDefault();
        if (validaForm(signUp)) {

            const signUpProduct = await fetch("/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    // "authorization": `a ${localStorage.getItem('token')}`
                },
                body: JSON.stringify(signUp),
            });
            const resJson = await signUpProduct.json();

            setTimeout(() => {
                if (signUpProduct.status === 201) {
                    //localStorage.setItem("token", resJson.token);
                    setSignUp({
                        name: "",
                        email: "",
                        password: "",
                        passwordConfirmation: "",
                        acceptsTerms: false,

                    });
                    navigate("/login");
                } else {

                    setFail(erros.fail);
                }
            }, 3000);
        }
    };


    return (
        <div className={styles.hug}>
            <form onSubmit={(e) => onSubmit(e)} className={styles.centerSignUp}>
                <h1 className={styles.signUpHeader}>SignUp</h1>

                <div className={styles.submitLine}>
                    <input
                        type="text"
                        placeholder="Name"
                        name="name"
                        value={signUp.name}
                        onChange={(e) => onChange(e)}
                        onBlur={(e) => onLostFocus(e)}
                        className={styles.inputSignUpInformation}
                    />

                </div>
                <span className={styles.msg}>{error.name}</span>


                <div className={styles.submitLine}>
                    <input
                        type="email"
                        placeholder="Email"
                        name="email"
                        value={signUp.email}
                        onChange={(e) => onChange(e)}
                        onBlur={(e) => onLostFocus(e)}
                        className={styles.inputSignUpInformation}
                    />

                </div>
                <span className={styles.msg}>{error.email}</span>

                <div className={styles.submitLine}>
                    <input
                        type={visiblePassword === false ? "password" : "text"}
                        placeholder="Password"
                        name="password"
                        value={signUp.password}
                        onChange={(e) => onChange(e)}
                        onBlur={(e) => onLostFocus(e)}
                        className={styles.inputSignUpInformation}
                    />

                </div>
                <span className={styles.msg}>{error.password}</span>

                <div className={styles.submitLine}>
                    <input
                        type={visiblePasswordConfirmation === false ? "password" : "text"}
                        placeholder="Confirm Password"
                        name="passwordConfirmation"
                        value={signUp.passwordConfirmation}
                        onChange={(e) => onChange(e)}
                        onBlur={(e) => onLostFocus(e)}
                        className={styles.inputSignUpInformation}
                    />

                </div>
                <span className={styles.msg}>{error.passwordConfirmation}</span>

                <label className={`${styles.switch} ${styles.switchPlace}`}>
                    <div><input
                        type="checkbox"
                        value={signUp.acceptsTerms}
                        onChange={(e) => onChange(e)}
                        name="acceptsTerms"
                    />
                        <span className={`${styles.slider} ${styles.round}`}></span>
                    </div>
                </label>
                <span className={styles.acceptsTerms}>Accept Terms</span>
                <span className={styles.msgAcceptsTerms}>{error.acceptsTerms}</span>





                <button
                    type="submit"
                    onClick={() => onSubmit()}
                    className={styles.btn}
                    value="Send"
                // disabled={disabled} 
                > Submit

                </button>
                {fail && <span className={styles.msg}>{fail}</span>}
            </form>

        </div>
    );

};

export default SignUp;
