import React, { useEffect, useState } from "react";
import logo from "../../Assests/logo.jpg";
import profile from "../../Assests/profile.jpg";
import moon from "../../Assests/moon.png";
import logout from "../../Assests/logout.png";
import lightMode from "../../Assests/lightMode.png";
import "./navbar.scss";
import { useNavigate } from "react-router-dom";

export default function Navbar({ children }) {
  const navigate =  useNavigate()
  const [Theme, setTheme] = useState("");

  useEffect(() => {
    const html = document.querySelector("html");

    if (!localStorage.getItem("theme")) {
      localStorage.setItem("theme", "Light");
      setTheme("Light");
      html.classList.add("light_theme");
      html.classList.remove("dark_theme");
      // getTheme && getTheme("Light");
    } else {
      setTheme(localStorage.getItem("theme"));
      if (localStorage.getItem("theme") === "Light") {
        html.classList.add("light_theme");
        html.classList.remove("dark_theme");
        // getTheme && getTheme("Light");
      } else {
        html.classList.add("dark_theme");
        html.classList.remove("light_theme");
        // getTheme && getTheme("Dark");
      }
    }
  }, []);

  const manageTheme = () => {
    const html = document.querySelector("html");

    if (localStorage.getItem("theme") === "Light") {
      setTheme("Dark");
      localStorage.setItem("theme", "Dark");
      html.classList.add("dark_theme");
      html.classList.remove("light_theme");
      // getTheme && getTheme("Dark");
    } else {
      setTheme("Light");
      localStorage.setItem("theme", "Light");
      html.classList.add("light_theme");
      html.classList.remove("dark_theme");
      // getTheme && getTheme("Light");
    }
  };

  return (
    <div className="navbar_wrapper">
      <div className="navbar_both_wrappers">
        <div className="navbar_left_wrapper">
          <img src={logo} alt="logo" className="logo" />
        </div>

        <div className="navbar_right_wrapper">
          <img
            src={Theme === "Light" ? moon : lightMode}
            alt="theme"
            className="moon"
            onClick={manageTheme}
          />
          <div className="verticle_separation" />
          <img src={profile} alt="profile" className="profile" />
          <div />
          <div className="username_wrapper">
            <p className="username">ASCRA Technologies</p>
            <p className="entity">Superadmin</p>
          </div>
          <div className="verticle_separation" />
          <img src={logout} alt="logout" className="logout" onClick={() => {
            localStorage.removeItem("role")
            localStorage.removeItem("accessToken")
            navigate("/")
          }} />
        </div>
      </div>
      <div className="children">{children} </div>
    </div>
  );
}
