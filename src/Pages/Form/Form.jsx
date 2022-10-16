import React, { useEffect, useState } from "react";
import Navbar from "../../Components/Navbar/Navbar";
import "./form.scss";
import profileIcon from "../../Assests/profileIcon.png";
import Input from "../../Components/Input/Input";
import Dropdown from "../../Components/Dropdown/Dropdown";
import { useNavigate, useParams } from "react-router-dom";

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

  const [isFullnameEmpty, setisFullnameEmpty] = useState(false);
  const [isEmailEmpty, setisEmailEmpty] = useState(false);
  const [isMobnoEmpty, setisMobnoEmpty] = useState(false);
  const [isAddressEmpty, setisAddressEmpty] = useState(false);
  const [InvalidEmail, setInvalidEmail] = useState(false);
  const [isBankEmpty, setisBankEmpty] = useState(false);
  const [isGenderEmpty, setisGenderEmpty] = useState(false);
  const [isTypeEmpty, setisTypeEmpty] = useState(false);
  const [isTerrEmpty, setisTerrEmpty] = useState(false);
  const [isCompanyEmpty, setisCompanyEmpty] = useState(false);
  const [details, setdetails] = useState([]);

  useEffect(() => {
    getClientData();
  }, []);

  const getClientData = () => {
    let myHeaders = new Headers();

    myHeaders.append("Accept", "application/json");
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append(
      "Authorization",
      "token " + localStorage.getItem("accessToken")
    );

    let requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
      mode: "no-cors",
    };

    fetch(
      `http://work.8848digitalerp.com/api/resource/Client/${clientName.name}`,
      requestOptions
    )
      .then((result) => console.log("result", result))
      .catch((error) => console.log("error", error));

    if (clientName.name === "Melissa Dane-03") {
      setfullname("Melissa Dane");
      setemail("melissa@gardenmanagement.com");
      setgender("Male");
      setaddress("PLAAAAA, Garden Management");
      setmobNo(123345345);
      setbank("Wells Fargo");
      settype("Company");
      setterritory("East");
      setcompany("Wayne Enterprises");
    } else if (clientName.name === "Bruce Wayne-02") {
      setfullname("Bruce");
      setemail("wayne@wayneent.com");
      setgender("Male");
      setaddress("Wayne Manor,\nMount Ave Drive,\nGotham City");
      setmobNo(346125987);
      setbank("Bank of America");
      settype("Individual");
      setterritory("West");
      setcompany("Wayne Enterprises");
    } else if (clientName.name === "Preston Clyde-01") {
      setfullname("Preston Clyde");
      setemail("data@gmail.com");
      setgender("Male");
      setaddress("East Avenue, Block 15\nShowbiz Pizza Place.\nNew York");
      setmobNo(987654321);
      setbank("HDFC");
      settype("Individual");
      setterritory("East");
      setcompany("Showbiz Pizza Place");
    }
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
    let FieldsEmpty = [];

    if (fullname === "") {
      setisFullnameEmpty(true);
      FieldsEmpty.push(true);
    }

    if (email === "") {
      setisEmailEmpty(true);
      FieldsEmpty.push(true);
    }
    if (mobNo === "") {
      setisMobnoEmpty(true);
      FieldsEmpty.push(true);
    }
    if (address === "") {
      setisAddressEmpty(true);
      FieldsEmpty.push(true);
    }

    if (email !== "" && !email.match(emailRegex)) {
      setInvalidEmail(true);
      FieldsEmpty.push(true);
    }

    if (company === "") {
      setisCompanyEmpty(true);
      FieldsEmpty.push(true);
    }

    if (bank === "") {
      setisBankEmpty(true);
      FieldsEmpty.push(true);
    }

    if (type === "") {
      setisTypeEmpty(true);
      FieldsEmpty.push(true);
    }

    if (territory === "") {
      setisTerrEmpty(true);
      FieldsEmpty.push(true);
    }

    if (gender === "") {
      setisGenderEmpty(true);
      FieldsEmpty.push(true);
    }

    if (FieldsEmpty.length === 0) {
      updateData();
    }
  };

  const updateData = () => {
    let myHeaders = new Headers();
    myHeaders.append("Authorization", "token 86ecc77628c9544:bb3daa49eab307e");
    myHeaders.append("Accept", "application/json");
    myHeaders.append("Content-Type", "application/json");

    let data = JSON.stringify({
      represents_company: company ? company : details.represents_company,
      full_name: fullname ? fullname : details.fullname,
      email: email ? email : details.email,
      gender: gender ? gender : details.gender,
      address: address ? address : details.address,
      mobile_no: mobNo ? mobNo : details.mobile_no,
      bank: bank ? bank : details.bank,
      type: type ? type : details.type,
      territory: territory ? territory : details.territory,
    });

    let requestOptions = {
      method: "PUT",
      headers: myHeaders,
      body: data,
      redirect: "follow",
    };

    fetch(
      `http://work.8848digitalerp.com/api/resource/Client/${clientName.name}`,
      requestOptions
    )
      .then((response) => response.text())
      .then((result) => console.log(result))
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
                onFocus={() => setisFullnameEmpty(false)}
                error={isFullnameEmpty}
              />
              <Input
                name="Email"
                value={email}
                onChange={(e) => setemail(e.target.value.trim())}
                onFocus={() => {
                  setisEmailEmpty(false);
                  setInvalidEmail(false);
                }}
                error={isEmailEmpty || InvalidEmail}
                errorMsg={InvalidEmail && "Invalid Email"}
              />
              <Input
                name="Mobile No"
                value={mobNo}
                onChange={(e) => {
                  if (!isNaN(e.target.value)) {
                    setmobNo(e.target.value.replace("  ", " "));
                  }
                }}
                onFocus={() => setisMobnoEmpty(false)}
                error={isMobnoEmpty}
              />

              <Dropdown
                ScrollColor="#4136f1"
                value={gender}
                selectedOption={gender}
                setIsActive={setisGenderActive}
                isActive={isGenderActive}
                defaultLabel="Select"
                name="Select Gender"
                emptySelection={isGenderEmpty}
                onClick={() => setisGenderEmpty(false)}
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
                onFocus={() => setisAddressEmpty(false)}
                error={isAddressEmpty}
              />

              <Dropdown
                ScrollColor="#4136f1"
                value={territory}
                selectedOption={territory}
                setIsActive={setisTerrActive}
                isActive={isTerrActive}
                defaultLabel="Select"
                name="Select Territory"
                emptySelection={isTerrEmpty}
                onClick={() => setisTerrEmpty(false)}
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
                emptySelection={isCompanyEmpty}
                onClick={() => setisCompanyEmpty(false)}
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
                emptySelection={isTypeEmpty}
                onClick={() => setisTypeEmpty(false)}
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
                emptySelection={isBankEmpty}
                onClick={() => setisBankEmpty(false)}
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
      </Navbar>
    </div>
  );
}
