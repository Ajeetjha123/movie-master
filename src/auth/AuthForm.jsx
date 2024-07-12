import React, { useRef, useState } from "react";
import { Button, Card, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../store/auth-context";

const AuthForm = () => {
  const navigate = useNavigate();
  const authCtx = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const confirmPasswordInputRef = useRef();

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const enteredEmail = emailInputRef.current
      ? emailInputRef.current.value
      : "";
    const enteredPassword = passwordInputRef.current
      ? passwordInputRef.current.value
      : "";
    const enteredConfirmPassword = confirmPasswordInputRef.current
      ? confirmPasswordInputRef.current.value
      : "";

    if (!isLogin && enteredPassword !== enteredConfirmPassword) {
      alert("Passwords do not match");
      return;
    }

    let url;
    if (isLogin) {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAa0GMruUMiR1o_ZU5RgFRnNtWHuTwG1-g";
    } else {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAa0GMruUMiR1o_ZU5RgFRnNtWHuTwG1-g";
    }

    fetch(url, {
      method: "POST",
      body: JSON.stringify({
        email: enteredEmail,
        password: enteredPassword,
        returnSecureToken: true,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          return res.json().then((data) => {
            let errorMessage = "Authentication failed!";
            throw new Error(errorMessage);
          });
        }
      })
      .then((data) => {
        authCtx.login(data.idToken);
        navigate("/home");
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  return (
    <div className="auth-form-container d-flex align-items-center justify-content-center vh-100">
      <Card style={{ width: "18rem" }}>
        <Card.Body>
          <Card.Title className="text-center mb-4">
            {isLogin ? "Login" : "Sign Up"}
          </Card.Title>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formGroupEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                style={{ backgroundColor: "#f8f9fa" }}
                ref={emailInputRef}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formGroupPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                style={{ backgroundColor: "#f8f9fa" }}
                ref={passwordInputRef}
                required
              />
            </Form.Group>
            {!isLogin && (
              <Form.Group className="mb-3" controlId="formGroupConfirmPassword">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Confirm Password"
                  style={{ backgroundColor: "#f8f9fa" }}
                  ref={confirmPasswordInputRef}
                  required
                />
              </Form.Group>
            )}
            <Button
              variant="primary"
              className="rounded-pill w-100"
              type="submit"
            >
              {isLogin ? "Login" : "Sign Up"}
            </Button>
          </Form>
          <Card.Footer
            className="text-center"
            onClick={switchAuthModeHandler}
            style={{ cursor: "pointer", backgroundColor: "#BDECFF" }}
          >
            {isLogin
              ? "Don't have an account? Sign Up"
              : "Have an account? Login"}
          </Card.Footer>
        </Card.Body>
      </Card>
    </div>
  );
};

export default AuthForm;
