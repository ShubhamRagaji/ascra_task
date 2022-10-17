import React, { useEffect, useState } from "react";
import Input from "../../Components/Input/Input";
import emailImg from "../../Assests/email.png";
import top_grad from "../../Assests/top_grad.png";
import bottom_grad from "../../Assests/bottom_grad.png";
import lock from "../../Assests/lock.png";
import right_grad from "../../Assests/right_grad.png";
import left_bottom_grad from "../../Assests/left_bottom_grad.png";
import top_left_grad from "../../Assests/top_left_grad.png";
import loadergif from "../../Assests/loader.gif";
import "./login.scss";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Login() {
  const navigate = useNavigate();

  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [visibility, setvisibility] = useState(false);
  const [invalidCred, setinvalidCred] = useState(false);

  const [isEmailEmpty, setisEmailEmpty] = useState(false);
  const [isPasswordEmpty, setisPasswordEmpty] = useState(false);
  const [loader, setloader] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("accessToken")) {
      navigate("/clientlist");
    }
  }, []);

  const validateFields = () => {
    if (email === "") {
      setisEmailEmpty(true);
    }

    if (password === "") {
      setisPasswordEmpty(true);
    }

    if (email !== "" && password !== "") {
      postData();
    }
  };

  const postData = () => {
    setloader(true);
    var requestOptions = {
      method: "POST",
      redirect: "follow",
    };

    fetch(
      `/api/method/work.api.login.get_access_api_token?usr=${email}&pwd=${password}`,
      requestOptions
    )
      .then((response) => {
        return response.text();
      })
      .then((result) => {
        setloader(false);

        let data = JSON.parse(result);
        if (data.message.access_token) {
          localStorage.setItem("role", "LoggedIn");
          localStorage.setItem("accessToken", data.message.access_token);
          navigate("/clientlist");
        } else {
          setinvalidCred(true);
        }
      })
      .catch((error) => {
        setloader(false);
        setinvalidCred(true);
      });
  };

  const enterPressed = (e) => {
    if (e.key === "Enter") {
      validateFields();
      e?.preventDefault();
      e?.stopPropagation();
    }
  };

  return (
    <div className="login_wrapper">
      <img src={right_grad} alt="right_grad" className="right_grad" />
      <img
        src={left_bottom_grad}
        alt="left_bottom_grad"
        className="left_bottom_grad"
      />

      <img src={top_left_grad} alt="top_left_grad" className="top_left_grad" />
      <div className="login_card">
        <img src={top_grad} alt="top_gradient" className="top_gradient" />
        <img src={bottom_grad} alt="bottom_grad" className="bottom_gradient" />
        <div className="login_left_wrapper">
          <p className="hello_label">Hello !</p>
          <p className="sign_in">Sign in to your account</p>

          <div className="login_email_password">
            <img src={emailImg} alt="" className="login_icon" />
            <Input
              value={email}
              onChange={(e) => {
                setemail(e.target.value);
                isEmailEmpty && setisEmailEmpty(false);
                invalidCred && setinvalidCred(false);
              }}
              placeholder="Enter Email"
              autoFocus
              error={isEmailEmpty}
              onFocus={() => {
                setisEmailEmpty(false);
                setinvalidCred(false);
              }}
              onKeyPress={(e) => enterPressed(e)}
            />
          </div>

          <div className="login_email_password">
            <div className="lock_img">
              <img src={lock} alt="" className="lock" />
            </div>
            <Input
              type={visibility ? "text" : "password"}
              placeholder="Enter Password"
              password
              value={password}
              onChange={(e) => {
                setpassword(e.target.value);
                isPasswordEmpty && setisPasswordEmpty(false);
                invalidCred && setinvalidCred(false);
              }}
              onVisibilityClick={() => setvisibility(!visibility)}
              error={isPasswordEmpty}
              onFocus={() => {
                setisPasswordEmpty(false);
                setinvalidCred(false);
              }}
              onKeyPress={(e) => enterPressed(e)}
            />
            <p className="for_pas">Forgot Password ?</p>
          </div>
          {invalidCred && (
            <div className="invalidCred">
              Invalid Username/Password. Please try again
            </div>
          )}
          <button
            className="sign_in_btn"
            onClick={validateFields}
            disabled={loader}
          >
            {loader ? (
              <img src={loadergif} alt="loadergif" className="loadergif" />
            ) : (
              "SIGN IN"
            )}
          </button>
        </div>

        <div className="login_right_wrapper">
          <div className="welcome_intro">
            <p className="welcome_label">Welcome Back !</p>
            <p className="intro">
              We're so happy to have you back and can't wait to catch up. We're
              just glad you're back with us.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
