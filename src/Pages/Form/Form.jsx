import React, { useEffect, useState } from "react";
import Navbar from "../../Components/Navbar/Navbar";
import "./form.scss";
import profileIcon from "../../Assests/profileIcon.png";
import Input from "../../Components/Input/Input";
import Dropdown from "../../Components/Dropdown/Dropdown";
import { useNavigate, useParams } from "react-router-dom";
import blueInfo from "../../Assests/blueInfo.png"

let specialCharacters = /[!@#$%^&*()+_~`\-=\[\]{};':"\\|,.<>\/?]+/;
let emailRegex =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export default function Form() {
  const navigate = useNavigate();
  const clientName = useParams();

  const [gender, setgender] = useState("");
  const [company, setcompany] = useState("");
  const [bank, setbank] = useState("");
  const [type, settype] = useState("");
  const [territory, setterritory] = useState("");

  const [isActive, setisActive] = useState(false);
  const [isGenderActive, setisGenderActive] = useState(false);
  const [istypeActive, setistypeActive] = useState(false);
  const [isTerrActive, setisTerrActive] = useState(false);
  const [isCompanyActive, setisCompanyActive] = useState(false);

  const [fullname, setfullname] = useState("");
  const [email, setemail] = useState("");
  const [mobNo, setmobNo] = useState("");
  const [address, setaddress] = useState("");

  const [successPopup, setsuccessPopup] = useState(false);

  const [error, seterror] = useState({
    isFullnameEmpty: false,
    isEmailEmpty: false,
    isMobnoEmpty: false,
    isAddressEmpty: false,
    isEmailInvalid: false,
  });

  useEffect(() => {
    getClientData();
  }, []);

  const getClientData = () => {
    let myHeaders = new Headers();

    myHeaders.append("Accept", "application/json");
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", localStorage.getItem("accessToken"));

    let requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(`/api/resource/Client/${clientName.name}`, requestOptions)
      .then((response) => response.text())
      .then((result) => {
        let data = JSON.parse(result);

        setfullname(data.data.full_name);
        setemail(data.data.email);
        setgender(data.data.gender);
        setaddress(data.data.address);
        setmobNo(data.data.mobile_no);
        setbank(data.data.bank);
        settype(data.data.type);
        setterritory(data.data.territory);
        setcompany(data.data.represents_company);
      })
      .catch((error) => console.log("error", error));
  };

  let bankdata = [
    "Goldman Sachs",
    "Citigroup Inc",
    "Wells Fargo",
    "Bank of America",
    "HDFC",
  ];

  let companys = [
    "8848 Digital LLP",
    "Wayne Enterprises",
    "The Lawn Guru",
    "Showbiz Pizza Place",
    "Pro Garden Management",
  ];

  const validateFields = () => {
    let _error = { ...error };

    if (fullname === "") {
      _error.isFullnameEmpty = true;
    }

    if (email === "") {
      _error.isEmailEmpty = true;
    }
    if (mobNo === "") {
      _error.isMobnoEmpty = true;
    }
    if (address === "") {
      _error.isAddressEmpty = true;
    }

    if (email !== "" && !email.match(emailRegex)) {
      _error.isEmailInvalid = true;
    }

    seterror({ ..._error });

    if (!Object.values(_error).includes(true)) {
      updateData();
    }
  };

  const setEmptyFalse = (value) => {
    let _error = { ...error };
    _error[value] = false;
    seterror({ ..._error });
  };

  const updateData = () => {
    let myHeaders = new Headers();
    myHeaders.append("Authorization", localStorage.getItem("accessToken"));
    myHeaders.append("Accept", "application/json");
    myHeaders.append("Content-Type", "application/json");

    let data = JSON.stringify({
      represents_company: company,
      full_name: fullname,
      email: email,
      gender: gender,
      address: address,
      mobile_no: Number(mobNo),
      bank: bank,
      type: type,
      territory: territory,
    });

    let requestOptions = {
      method: "PUT",
      headers: myHeaders,
      body: data,
      redirect: "follow",
    };

    fetch(`/api/resource/Client/${clientName.name}`, requestOptions)
      .then((response) => response.text())
      .then((result) => setsuccessPopup(true))
      .catch((error) => console.log("error", error));
  };

  return (
    <div
      className="form_wrapper"
      onClick={() => {
        isActive && setisActive(false);
        isGenderActive && setisGenderActive(false);
        isTerrActive && setisTerrActive(false);
        istypeActive && setistypeActive(false);
        isCompanyActive && setisCompanyActive(false);
      }}
    >
      <Navbar>
        <div className="form">
          <div className="form_label">
            <h4 className="top_header">View / Edit Details</h4>
            <p className="form_sublabel">Your inputs matter to us</p>
          </div>

          <div className="bottom_wrapper">
            <div className="form_client_profile">
              <img src={profileIcon} alt="" className="form_profile_icon" />
              <p className="client_name">Preston Clyde-01</p>
            </div>

            <div className="form_inputs">
              <Input
                name="Full Name"
                autoFocus
                value={fullname}
                onChange={(e) =>
                  setfullname(
                    e.target.value
                      .replace("  ", " ")
                      .replace(specialCharacters, "")
                      .trimStart()
                  )
                }
                onFocus={() => setEmptyFalse("isFullnameEmpty")}
                error={error.isFullnameEmpty}
              />
              <Input
                name="Email"
                value={email}
                onChange={(e) => setemail(e.target.value.trim())}
                onFocus={() => {
                  error.isEmailEmpty
                    ? setEmptyFalse("isEmailEmpty")
                    : setEmptyFalse("isEmailInvalid");
                }}
                error={error.isEmailEmpty || error.isEmailInvalid}
                errorMsg={error.isEmailInvalid && "Invalid Email"}
              />
              <Input
                name="Mobile No"
                value={mobNo}
                maxLength={9}
                onChange={(e) => {
                  if (!isNaN(e.target.value)) {
                    setmobNo(e.target.value.replace("  ", " "));
                  }
                }}
                onFocus={() => setEmptyFalse("isMobnoEmpty")}
                error={error.isMobnoEmpty}
              />

              <Dropdown
                ScrollColor="#4136f1"
                value={gender}
                selectedOption={gender}
                setIsActive={setisGenderActive}
                isActive={isGenderActive}
                defaultLabel="Select"
                name="Select Gender"
              >
                {["Male", "Female"]?.map((item, index) => (
                  <div
                    key={item}
                    className="itm"
                    onClick={(e) => {
                      setisGenderActive(!isGenderActive);
                      setgender(item);
                    }}
                  >
                    <p>{item}</p>
                  </div>
                ))}{" "}
              </Dropdown>

              <Input
                name="Address"
                value={address}
                onChange={(e) =>
                  setaddress(e.target.value.replace("  ", " ").trimStart())
                }
                onFocus={() => setEmptyFalse("isAddressEmpty")}
                error={error.isAddressEmpty}
              />

              <Dropdown
                ScrollColor="#4136f1"
                value={territory}
                selectedOption={territory}
                setIsActive={setisTerrActive}
                isActive={isTerrActive}
                defaultLabel="Select"
                name="Select Territory"
              >
                {["East", "West", "North", "South"]?.map((item, index) => (
                  <div
                    key={item}
                    className="itm"
                    onClick={(e) => {
                      setisTerrActive(!isTerrActive);
                      setterritory(item);
                    }}
                  >
                    <p>{item}</p>
                  </div>
                ))}{" "}
              </Dropdown>

              <Dropdown
                ScrollColor="#4136f1"
                value={company}
                selectedOption={company}
                setIsActive={setisCompanyActive}
                isActive={isCompanyActive}
                defaultLabel="Select"
                name="Select Company"
              >
                {companys?.map((item, index) => (
                  <div
                    key={item}
                    className="itm"
                    onClick={(e) => {
                      setisCompanyActive(!isCompanyActive);
                      setcompany(item);
                    }}
                  >
                    <p>{item}</p>
                  </div>
                ))}{" "}
              </Dropdown>

              <Dropdown
                ScrollColor="#4136f1"
                value={type}
                selectedOption={type}
                setIsActive={setistypeActive}
                isActive={istypeActive}
                defaultLabel="Select"
                name="Select Type"
              >
                {["Company", "Individual"]?.map((item, index) => (
                  <div
                    key={item}
                    className="itm"
                    onClick={(e) => {
                      setistypeActive(!istypeActive);
                      settype(item);
                    }}
                  >
                    <p>{item}</p>
                  </div>
                ))}{" "}
              </Dropdown>

              <Dropdown
                ScrollColor="#4136f1"
                value={bank}
                selectedOption={bank}
                setIsActive={setisActive}
                isActive={isActive}
                defaultLabel="Select"
                name="Select Bank"
              >
                {bankdata?.map((item, index) => (
                  <div
                    key={item}
                    className="itm"
                    onClick={(e) => {
                      setisActive(!isActive);
                      setbank(item);
                    }}
                  >
                    <p>{item}</p>
                  </div>
                ))}{" "}
              </Dropdown>
            </div>

            <div className="btns">
              <button
                className="btn back_btn"
                onClick={() => navigate("/clientlist")}
              >
                Back
              </button>
              <button className="btn" onClick={validateFields}>
                Submit
              </button>
            </div>
          </div>
        </div>
      </Navbar>

      {successPopup && (
        <div className="popup">
          <div className="overlay" />
          <div style={{ position: "relative" }}>
            <div className="popupContent">
              <img src={blueInfo} alt="info" className="blueInfo" />
              <p className="ki">Kind Information</p>
              <p className="label">Details updated successfully</p>
              <button className="okBtn" onClick={() => setsuccessPopup(false)}>
               Okay
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
