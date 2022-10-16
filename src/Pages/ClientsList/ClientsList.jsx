import axios from "axios";
import React, { useEffect, useState } from "react";
import Navbar from "../../Components/Navbar/Navbar";
import search from "../../Assests/search.png";
import deleteCard from "../../Assests/delete.png";
import profileIcon from "../../Assests/profileIcon.png";
import company from "../../Assests/company.png";
import email from "../../Assests/email.png";
import created from "../../Assests/created.png";
import info from "../../Assests/info.png";
import "./clientsLists.scss";
import Scroller from "../../Components/ScrollBar/ScrollBar";
import { useNavigate } from "react-router-dom";

export default function ClientsList() {
  const navigate = useNavigate();

  const [clientsData, setclientsData] = useState([]);
  const [searchedClientsData, setsearchedClientsData] = useState([]);
  const [noDataFound, setnoDataFound] = useState(false);

  useEffect(() => {
    getClientData();
  }, []);

  const getClientData = () => {
    var myHeaders = new Headers();
    myHeaders.append(
      "Authorization",
      "token " + localStorage.getItem("accessToken")
    );
    myHeaders.append("Accept", "application/json");
    myHeaders.append("Content-Type", "application/json");

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
      mode: "no-cors",
    };

    fetch("http://work.8848digitalerp.com/api/resource/Client/", requestOptions)
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));

    let clientsData = [
      {
        name: "Melissa Dane-03",
      },
      {
        name: "Bruce Wayne-02",
      },
      {
        name: "Preston Clyde-01",
      },
    ];

    let _data = [...clientsData];
    let data = [
      {
        company: "Wayne Enterprises",
        email: "melissa@gardenmanagement.com",
        created: "20 July 2022",
      },
      {
        company: "Wayne Enterprises",
        email: "wayne@wayneent.com",
        created: "20 July 2022",
      },
      {
        company: "Showbiz Pizza Place",
        email: "data@gmail.com",
        created: "20 July 2022",
      },
    ];

    _data.map((item, index) => {
      item["company"] = data[index].company;
      item["email"] = data[index].email;
      item["created"] = data[index].created;
    });

    setsearchedClientsData(_data);
    setclientsData(_data);
  };

  return (
    <div className="clientlist_wrapper">
      <Navbar>
        <div className="clients_topbar">
          <div className="clients_label">
            <h4 className="top_header">Clients</h4>
            <p className="client_sublabel">It's all about customers.</p>
          </div>

          <div className="search_delete_wrapper">
            <div className="delete_wrapper">
              <img src={deleteCard} alt="" className="delete" />
            </div>
            <div className="search_container">
              <img src={search} alt="" className="search" />
              <input
                type="text"
                className="search_superadmin"
                placeholder="Search here"
                onChange={(e) => {
                  let _data = [];

                  clientsData.map((item) => {
                    if (
                      item.name
                        .toLowerCase()
                        .startsWith(e.target.value.toLowerCase())
                    ) {
                      _data.push(item);
                    }
                  });

                  setsearchedClientsData(_data);

                  _data.length === 0
                    ? setnoDataFound(true)
                    : setnoDataFound(false);
                }}
              />
            </div>
          </div>
        </div>

        <div className="divider" />
        <div className="clients_cards_wrapper">
          {noDataFound && <p className="noClients">No Clients Found</p>}
          <Scroller
            autoHeightMax="62vh"
            verticalStyle={{
              width: "0.12vw",
              backgroundColor: "#283e92",
              marginLeft: "0.2vw",
            }}
          >
            <div className="client_info_card">
              {searchedClientsData?.map((item, index) => (
                <div className="main_card" key={"client" + index}>
                  <img
                    src={info}
                    alt=""
                    className="info"
                    onClick={() => {
                      navigate("/form/" + item.name);
                    }}
                  />
                  <div className="client_profile">
                    <img src={profileIcon} alt="" className="profile_icon" />
                    <p className="name">{item.name.split("-")[0]} </p>
                  </div>

                  <div className="client_info">
                    <div className="info_subwrapper">
                      <img src={company} alt="" className="icon" />
                      <p>{item.company}</p>
                    </div>
                    <div className="info_subwrapper">
                      <img src={email} alt="" className="icon" />
                      <p className="email">{item.email}</p>
                    </div>
                    <div className="info_subwrapper">
                      <img src={created} alt="" className="icon" />
                      <p>{item?.created}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Scroller>
        </div>
      </Navbar>
    </div>
  );
}
